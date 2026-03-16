const API = "/api/productos";
const token = localStorage.getItem("token");

if (!token) {
  alert("Acceso denegado");
  window.location.href = "login.html";
}

const contenido = document.getElementById("contenido");
let productosGlobales = [];

//reutilizar
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

function cerrarSesion() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

async function cargarProductos() {
  try {
    const res = await fetch(API);
    productosGlobales = await res.json();

    contenido.innerHTML = `
      <h2>Inventario</h2>
      ${productosGlobales
        .map(
          (p) => `
        <div class="card">
          <h3>${p.nombre}</h3>
          <p>${p.plataforma}</p>
          <p>$${p.precio}</p>
          <p>Stock: ${p.stock}</p>
          <p>${p.tipo} | ${p.categoria}</p>

          <div class="acciones">
            <button onclick="formEditar('${p._id}')">Editar</button>
            <button class="delete" onclick="eliminar('${p._id}')">Eliminar</button>
          </div>
        </div>
      `,
        )
        .join("")}
    `;
  } catch (error) {
    console.error(error);
  }
}

function formCrear() {
  contenido.innerHTML = `
    <h2>Nuevo Producto</h2>

    <form id="form">
      <input name="nombre" placeholder="Nombre" required>
      <input name="plataforma" placeholder="Plataforma" required>
      <input name="descripcion" placeholder="Descripción">
      
      <input type="number" name="precio" placeholder="Precio" required>
      <input type="number" name="stock" placeholder="Stock">

      <input name="categoria" placeholder="Categoría">
      <input name="tipo" placeholder="Tipo">

      <button type="submit">Guardar</button>
      <button type="button" onclick="cargarProductos()">Cancelar</button>
    </form>
  `;

  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    await fetch(API, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    cargarProductos();
  });
}

function formEditar(id) {
  const p = productosGlobales.find((x) => x._id === id);

  contenido.innerHTML = `
    <h2>Editar Producto</h2>

    <form id="form">
      <input name="nombre" value="${p.nombre}" required>
      <input name="plataforma" value="${p.plataforma}" required>
      <input name="descripcion" value="${p.descripcion || ""}">
      
      <input type="number" name="precio" value="${p.precio}" required>
      <input type="number" name="stock" value="${p.stock}">

      <input name="categoria" value="${p.categoria || ""}">
      <input name="tipo" value="${p.tipo || ""}">

      <button type="submit">Actualizar</button>
      <button type="button" onclick="cargarProductos()">Cancelar</button>
    </form>
  `;

  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    cargarProductos();
  });
}

async function eliminar(id) {
  if (!confirm("¿Eliminar producto?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers,
  });

  cargarProductos();
}

cargarProductos();
