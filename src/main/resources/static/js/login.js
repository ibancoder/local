/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Funció que s'executa quan es carrega el DOM i crida a la funció.
 * @function verificarSessio - Per comprovar si hi ha una sessió activa.
 */
document.addEventListener("DOMContentLoaded", function () {
  verificarSessio();
});

/**
 * Inicialitza l'esdeveniment d'inici de sessió per al formulari login.
 * Associa un controlador d'esdeveniments per enviar les credencials de
 * l'usuari al servidor.
 */
export function login() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    iniciarSessio();
  });
}

/**
 * Funció asincrona per iniciar la sessió de l'usuari.
 * Envia les credencials al servidor per autenticar l'usuari i desa el ID de l'usuari en
 * localStorage o SessionStorage segons la opció triada.
 * Redirigeix a la pàgina corresponent segons el tipus d'usuari.
 *
 * @async
 */
let iniciarSessio = async () => {
  const nomUsuari = document.getElementById("nomUsuari").value;
  const password = document.getElementById("password").value;
  const mantenirConnexió = document.getElementById("connected").checked;

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

      // Desa l'usuari a LocalStorage o SessionStorage segons la opció trioada al check "connected".
      if (mantenirConnexió) {
        localStorage.setItem("idUsuari", usuari.idUsuari);
      } else {
        sessionStorage.setItem("idUsuari", usuari.idUsuari);
      }

      // Actualitza el nom d'usuari per la funció actualitzarLoginSection.
      let usuariSection = usuari.nomUsuari;
      actualitzarLoginSection(usuariSection);
      console.log(usuariSection);

      // Si el usuari es admin o no, redirigeix a la pàgina de l'usuari.
      if (usuari.nomUsuari === "admin") {
        window.location.href = "/usuariAdmin.html";
      } else {
        window.location.href = "/usuari.html";
      }
    } else if (response.status === 401) {
      alert("Usuari o password incorrectes");
      document.getElementById("nomUsuari").value = "";
      document.getElementById("password").value = "";
      document.getElementById("nomUsuari").focus();
    } else {
      alert("Error a l'inici de sessió");
    }
  } catch (error) {
    console.error("Error en la solicitud", error);
    alert("Error de connexió");
  }
};

/**
 * Funció per actualitzar el loginSection amb el nom de l'usuari loguejat.
 * Si l'usuari es "admin" el redirigeix a la seva pàgina sino a la de l'usuari loguejat.
 * @param {*} usuariSection - Nom de l'usuari que es mostrarà a la secció de login.
 * @function actualitzarLoginSection
 */
function actualitzarLoginSection(usuariSection) {
  const loginSection = document.getElementById("loginSection");
  if (loginSection) {
    document.getElementById("login").style.display = "none";
    loginSection.innerHTML = `<i class="fa-solid fa-user" style="color: white;"></i> ${usuariSection}`;
    loginSection.onclick = () => {
      window.location.href =
        usuariSection === "admin"
          ? `usuariAdmin.html?id=${usuariSection}`
          : `usuari.html?id=${usuariSection}`;
    };
  } else {
    console.warn("Element loginSection no trovat al DOM");
  }
}

/**
 * Verifica si hi ha un usuari a la sessió. Si existeix, obté les dades de l'usuari 
 * des del servidor i actualitza la secció de login amb el nom de l'usuari.
 */
export async function verificarSessio() {
  const idUsuari = localStorage.getItem("idUsuari") || sessionStorage.getItem("idUsuari");  
  if (idUsuari) {
    try {
      const response = await fetch(`${baseUrl}/api/usuari/${idUsuari}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const usuari = await response.json();
      let usuariSection = usuari.nomUsuari;
      console.log(usuariSection);
      actualitzarLoginSection(usuariSection);
    } catch (error) {
      console.error("Error en obtenir l'usuari: ", error);
    }
  } else {
    console.log("No hi ha cap usuari actiu a la sessió.");
  }
}
