const API = "/api/productos";

const form = document.getElementById("formProducto");
const contenedor = document.getElementById("productos");
let editandoId = null;
function verificarAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión");
    window.location.href = "/login.html";
  }

  return token;
}

const token = verificarAuth();

async function cargarProductos() {
  const res = await fetch(API);
  const data = await res.json();

  contenedor.innerHTML = "";

  data.forEach((p) => {
    contenedor.innerHTML += `
      <div class="card">
          <h3>${p.nombre}</h3>
          <p>🎮 ${p.plataforma}</p>
          <p>${p.descripcion}</p>
          <p>💰 ${p.precio}</p>
          <p>${p.categoria}</p>
          <p>${p.tipo}</p>
          <p>Stock: ${p.stock}</p>
          <button onclick="editar('${p._id}')">Editar</button>
          <button onclick="eliminar('${p._id}')">Eliminar</button>
      </div>
    `;
  });
}
//crea producto
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  if (editandoId) {
    await fetch(`${API}/${editandoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    editandoId = null;
  } else {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  form.reset();
  cargarProductos();
});

function editar(id) {
  const producto = document.querySelector(
    `[onclick="editar('${id}')"]`,
  ).parentElement;

  const inputs = form.elements;

  inputs.nombre.value = producto.children[0].innerText;
  inputs.plataforma.value = producto.children[1].innerText.replace("", "");
  inputs.descripcion.value = producto.children[2].innerText;
  inputs.precio.value = producto.children[3].innerText.replace("", "");
  inputs.categoria.value = producto.children[4].innerText;
  inputs.tipo.value = producto.children[5].innerText;
  inputs.stock.value = producto.children[6].innerText.replace("Stock: ", "");

  editandoId = id;
}

async function eliminar(id) {
  if (!confirm("¿Eliminar producto?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  cargarProductos();
}

cargarProductos();
