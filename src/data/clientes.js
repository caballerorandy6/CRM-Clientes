export async function obtenerClientes() {
  //FETCH a la variable de entorno
  const respuesta = await fetch(import.meta.env.VITE_API_URL); //Aqui utiliza el method: 'GET', no se especifica pq por defecto metodo de fetch el 'GET'
  const resultado = await respuesta.json();

  //console.log(resultado);

  return resultado;
}

export async function obtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
  const resultado = await respuesta.json();
  return resultado;
}

export async function agregarCliente(datos) {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST", //Para ingresar datos
      body: JSON.stringify(datos), //Para convertir los datos a JSON
      headers: {
        "Content-Type": "application/json", // Para definir que la peticion es de tipo JSON
      },
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarCliente(id, datos) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "PUT", //Para ingresar datos
      body: JSON.stringify(datos), //Para convertir los datos a JSON
      headers: {
        "Content-Type": "application/json", // Para definir que la peticion es de tipo JSON
      },
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE", //Para ingresar datos
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
