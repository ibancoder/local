/*********************** URL *********************************/
// const baseUrl = "http://178.156.55.174:1234";   // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Funció que s'executa quan el document ha estat carregat.
 * S'associa l'esdeveniment de submit al formulari d'inici de sessió.
 */
export function login() {
  const loginFormHeader = document.getElementById("loginFormHeader");
  if (loginFormHeader) {
    loginFormHeader.addEventListener("submit", async function (event) {
      event.preventDefault();
      iniciarSessio(event);  // Pass event to iniciarSessio
    });
  }

  const loginFormPage = document.getElementById("loginFormPage");
  if (loginFormPage) {
    loginFormPage.addEventListener("submit", async function (event) {
      event.preventDefault();
      iniciarSessio(event);  // Pass event to iniciarSessio
    });
  }
}

/**
 * Funció per iniciar sessió d'usuari.
 * Aquesta funció fa una petició POST a l'API per autenticar l'usuari.
 * @async
 * @function iniciarSessio
 */
let iniciarSessio = async (event) => {
  const form = event.target;  // Use event.target to access the form
  const nomUsuari = form.querySelector("#nomUsuari").value;
  const password = form.querySelector("#password").value;

  if (nomUsuari && password) {
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomUsuari, password }),
      });

      if (response.ok) {
        const usuari = await response.json();
        console.log("Usuario autenticat:", usuari);
        if (usuari.nomUsuari == "admin") {
          window.location.href = "usuariAdmin.html";
        } else {
          localStorage.setItem("idUsuari", usuari.idUsuari);
          alert("Inici de sessió correcte!");
          window.location.href = `usuari.html?id=${usuari.idUsuari}`;
        }
      } else if (response.status === 401) {
        alert("Usuario o contraseña incorrectos");
        form.querySelector("#nomUsuari").value = "";
        form.querySelector("#password").value = "";
        form.querySelector("#nomUsuari").focus();
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
      alert("Error de conexión");
    }
  }
};