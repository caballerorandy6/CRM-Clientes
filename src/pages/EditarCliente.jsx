import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import Error from "../components/Error";

//Loader para cargar el cliente que se va a editar
export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  //Validadndo el Objeto cliente. Y mostrando error si no se encuentra
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "El cliente no fue encontrado",
    });
  }

  //console.log(cliente);
  return cliente;
}

//Action para Submit el Cliente editado. En esta caso el action toma como argumento un params para identificar al cliente que se va a editar
export async function action({ request, params }) {
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

  //Actualizar el cliente
  await actualizarCliente(params.clienteId, datos);

  //El action siempre retorna algo. En este caso retornamos un redirect para enviar al usuario hacia otra pagina.
  return redirect("/");
}

function EditarCliente() {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        A continuacion podrás modificar los datos de un cliente
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
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 hover:bg-blue-900 transition-colors active:bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
