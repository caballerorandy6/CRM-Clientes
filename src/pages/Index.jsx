import { useLoaderData } from "react-router-dom"; // Se utiliza para acceder a lo que se retorne el loader
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";

//Esta funcion se va a ejecutar cuando el componente este listo, es una funcion de React Router Dom.
//Es ideal para cargar un state o cunsultar una API y obtener un resultado que se quiera mostrar en un componente.
//Esta funcion siempre retorna algo. //Es similar a un useEffect
export function loader() {
  const clientes = obtenerClientes();

  //Siempre el loader debe retornar algo
  return clientes;
}

const Index = () => {
  //Obteniendo el resultado de un loader
  const clientes = useLoaderData();
  //console.log(clientes);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      {clientes?.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes aún</p>
      )}
    </>
  );
};

export default Index;
