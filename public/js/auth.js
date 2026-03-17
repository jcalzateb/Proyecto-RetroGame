const api = "/api/auth";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`${api}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message);

      if (res.ok) {
        window.location.href = "login.html";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch(`${api}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.token) {
        // Guarda token storage
        localStorage.setItem("token", result.token);
        window.location.href = "dashboard.html";
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}
