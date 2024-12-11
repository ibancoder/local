/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Funció que s'executa quan es carrega el DOM i crida a la funció.
 * @function verificarSessio
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  verificarSessio();
});

/**
 * Inicialitza l'esdeveniment d'inici de sessió per al formulari login.
 * Associa un controlador d'esdeveniments per enviar les credencials de
 * l'usuari al servidor.
 * @function login
 */
export function login() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      await iniciarSessio();
    });
  } else {
    console.warn("El formulari de login no s'ha trobat al DOM");
  }
}

/**
 * Funció asincrona per iniciar la sessió de l'usuari.
 * Envia les credencials al servidor per autenticar l'usuari i desa el ID de l'usuari en
 * localStorage o SessionStorage segons la opció triada.
 * Redirigeix a la pàgina corresponent segons el tipus d'usuari.
 *
 * @async
 * @function iniciarSessio
 * @returns {Promise<void>} Retorna una promesa que no resol res explícitament.
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
        if (usuari.nomUsuari === "LobitaAdmin") {
          localStorage.setItem("isAdmin", true);
        } else {
          localStorage.setItem("isAdmin", false);
        }
      } else {
        sessionStorage.setItem("idUsuari", usuari.idUsuari);
        if (usuari.nomUsuari === "LobitaAdmin") {
          sessionStorage.setItem("isAdmin", true);
        } else {
          sessionStorage.setItem("isAdmin", false);
        }
      }

      // Actualitza el nom d'usuari per la funció actualitzarLoginSection.
      let usuariSection = usuari.nomUsuari;
      actualitzarLoginSection(usuariSection);

      // Si el usuari es admin o no, redirigeix a la pàgina de l'usuari.
      if (usuari.nomUsuari === "LobitaAdmin") {
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
 * Assigna una funció de redirecció basada en el tipus d'usuari.
 * @param {string} usuariSection - Nom de l'usuari que es mostrarà a la secció de login.
 * @function actualitzarLoginSection
 */
function actualitzarLoginSection(usuariSection) {
  const loginSection = document.getElementById("loginSection");
  if (loginSection) {
    document.getElementById("login").style.display = "none";
    loginSection.innerHTML = `<i class="fa-solid fa-user" style="color: white;"></i> ${usuariSection}`;
    loginSection.onclick = () => {
      window.location.href = usuariSection === "LobitaAdmin" ? `usuariAdmin.html?id=${usuariSection}` : `usuari.html?id=${usuariSection}`;
    };
  }
}

/**
 * Verifica si hi ha un usuari a la sessió. Si existeix, obté les dades de l'usuari
 * des del servidor i actualitza la secció de login amb el nom de l'usuari.
 * @async
 * @function verificarSessio
 */
export async function verificarSessio() {
  const idUsuari =
    localStorage.getItem("idUsuari") || sessionStorage.getItem("idUsuari");
  if (idUsuari) {
    try {
      const response = await fetch(`${baseUrl}/api/usuari/${idUsuari}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const usuari = await response.json();
      let usuariSection = usuari.nomUsuari;
      actualitzarLoginSection(usuariSection);
    } catch (error) {
      console.error("Error en obtenir l'usuari: ", error);
    }
  }
}
