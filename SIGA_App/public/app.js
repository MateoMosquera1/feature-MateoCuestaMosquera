const BASE_URL = "/api/productos"

async function cargarProductos() {
  const response = await fetch(BASE_URL)
  const productos = await response.json()
  
  const lista = document.getElementById("lista-productos")
  lista.innerHTML = ""
  
  productos.forEach(producto => {
    lista.innerHTML += `
            <div class="producto-card">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Género: ${producto.genero}</p>
                <button onclick="eliminarProducto(${producto.id})"> Eliminar</button>
            </div>
        `
  })

}

async function crearProducto() {
  const nombre = document.getElementById("nombre").value
  const precio = document.getElementById("precio").value
  const genero = document.getElementById("genero").value

  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio, genero })
  })

  cargarProductos()
}

async function eliminarProducto(id) {
  await fetch('${BASE_URL}/${id}', {
    method: "DELETE"
  })

  cargarProductos()
}

cargarProductos()
  
  
                    
                    
