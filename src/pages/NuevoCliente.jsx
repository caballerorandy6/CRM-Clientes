//useNavigate nos permite navegar hacia otra pagina en caso de que el usuario presione un boton o haya pasado una validación
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

//Metodo para enviar formulario
export async function action({ request }) {
  const formData = await request.formData();

  const datos = Object.fromEntries(formData); //Datos contienen lo ingresado en el formulario por el usuario
  //console.log(datos);

  //Validacion de un campo especifico del formulario
  const email = formData.get("email");

  //Validacion de todos los campos del formulario
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  //Expresion Regular para validar email
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }

  //console.log(errores);

  //Retornar datos si hay errores
  if (Object.keys(errores).length) {
    return errores;
  }

  //Agregar Cliente. Se le agrega el await para esperar que se agrege el cliente y no se ejecute nada mas en el codigo.
  await agregarCliente(datos);

  //El action siempre retorna algo. En este caso retornamos un redirect para enviar al usuario hacia otra pagina.
  return redirect("/");
}

const NuevoCliente = () => {
  //Obteniendo el resultado de un action
  const errores = useActionData();

  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")} //Hace lo mismo onClick={()=> navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        {/*Mostrando los errores*/}
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          {/* "noValidate desabilita la validacion de html5" */}
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 hover:bg-blue-900 transition-colors active:bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
