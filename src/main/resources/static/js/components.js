//Servidor
//import { tancarSessio } from "http://178.156.55.174:8085/js/logout.js";
//import { login, verificarSessio } from "http://178.156.55.174:8085/js/login.js";

//En local: borrar al final
import { tancarSessio } from "./logout.js";
import { login }  from "./login.js";
import { verificarSessio }  from "./login.js";

/***
 * Funció per tornar enrere a la pàgina anterior o redirigir a una URL
 * de seguretat si no hi ha historial.
 */
window.tornarEnrere = function () {
  if (!document.referrer) {
    window.location.href = "./index.html";
  } else {
    history.back();
  }
};

/**
 * Escolta l'esdeveniment "DOMContentLoaded" i carrega diversos components en el DOM.
 * Un cop el document està completament carregat, executa la funció "CarregarComponent"
 * per als components "header", "footer", "headerPetit" i "footerPetit".
 */
document.addEventListener("DOMContentLoaded", function () {
  cargarComponent("header");
  cargarComponent("footer");
  cargarComponent("headerPetit");
  cargarComponent("footerPetit");
});

/**
 * Funció que carrega un component HTML al DOM des d'un fitxer extern.
 * @param {*} component - El nom del component a carregar, que també s'utilitza com a ID
 * de l'element al DOM. S'espera el fitxer HTML corresponent a `./components/{component}.html`.
 *
 */
function cargarComponent(component) {
  // Comprovar si l'element amb aquest ID existeix al DOM
  const element = document.querySelector(`#${component}`);
  if (element) {
    fetch(`./components/${component}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No es va poder carregar el component ${component}.`);
        }
        return response.text();
      })
      .then((html) => {
        element.innerHTML = html;
        // Si el component es 'header', crida a la funció login
        // Si el component és 'headerPetit', crida a la funció TancarSessio.
        if (component === "header") {
          login();
          verificarSessio();
        } else if (component === "headerPetit") {
          tancarSessio();
          window.tornarEnrere = tornarEnrere;
        }
      })
      .catch((error) =>
        console.error(`Error al carregar ${component}:`, error)
      );
  }
}
