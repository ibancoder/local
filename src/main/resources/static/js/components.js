import { tancarSessio } from 'http://localhost:1234/js/logout.js';
import { login } from 'http://localhost:1234/js/login.js';

document.addEventListener('DOMContentLoaded', function () {
  cargarComponent('header');
  cargarComponent('footer');
  cargarComponent('headerPetit');
  cargarComponent('footerPetit');
});

function cargarComponent(component) {
  const element = document.querySelector(`#${component}`);
  if (element) {
    fetch(`./components/${component}.html`)
      .then(response => response.text())
      .then(html => {
        element.innerHTML = html;

        if (component === 'header') {
          login();
        } else if (component === 'headerPetit') {
          tancarSessio();
        }

      })
      .catch(error => console.error(`Error al carregar ${component}:`, error));
  }
}