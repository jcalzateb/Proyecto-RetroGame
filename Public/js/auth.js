const API = "/api/auth/login";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form));

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resultado = await res.json();

  if (resultado.token) {
    localStorage.setItem("token", resultado.token);
    alert("Login exitoso");

    window.location.href = "/dashboard.html";
  } else {
    alert(resultado.mensaje);
  }
});
