const API = "/api/productos";
const contenedor = document.getElementById("productos");

let productosGlobales = [];

async function cargarProductos() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    productosGlobales = data;
    render(productosGlobales);
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<p>Error al cargar productos</p>";
  }
}

function render(data) {
  if (data.length === 0) {
    contenedor.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  contenedor.innerHTML = data
    .map(
      (p) => `
    <div class="card">
      <h3>${p.nombre}</h3>
      <p><strong>Plataforma:</strong> ${p.plataforma}</p>
      <p><strong>Precio:</strong> $${p.precio}</p>

      <button onclick="comprar('${p._id}')">🛒 Comprar</button>
    </div>
  `,
    )
    .join("");
}

function filtrar(texto) {
  const filtrados = productosGlobales.filter((p) =>
    p.nombre.toLowerCase().includes(texto.toLowerCase()),
  );

  render(filtrados);
}

function comprar(id) {
  alert("Compra simulada: " + id);
}

cargarProductos();
