import { Outlet, Link } from "react-router-dom";

//Este Layout va a ser el modelo principal de todas las paginas
const Layout = () => {
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM Clientes
        </h2>

        {/* Navegación */}
        <nav className="mt-10">
          <Link
            className="text-2xl block mt-2 hover:text-blue-300 text-white"
            to="/"
          >
            Clientes
          </Link>
          <Link
            className="text-2xl block mt-2 hover:text-blue-300 text-white"
            to="/clientes/nuevo"
          >
            Nuevos Cliente
          </Link>
        </nav>
      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        {/* Contiene el contenido específico de cada página */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
