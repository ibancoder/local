/**
 * Afegeix un esdeveniment de submit al formulari i mostra un missatge d'alerta
 * quan es fa clic al botó d'enviament.
 */
document.getElementById("form").addEventListener("submit", function (event) {
  alert("Formulari enviat correctament");
});

/*** VALIDACIONS FORMULARI ***/
const nom = document.getElementById("inputNom");
const cognom = document.getElementById("inputCognom");
const email = document.getElementById("inputEmail");
const telefon = document.getElementById("inputTelefon");

// Validació nom, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
nom.addEventListener("input", function () {
  if (nom.validity.patternMismatch) {
    nom.setCustomValidity("Nom invàlid: només es permeten lletres i espais.");
  } else {
    nom.setCustomValidity("");
  }
});

// Validació cognoms, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
cognom.addEventListener("input", function () {
  if (cognom.validity.patternMismatch) {
    cognom.setCustomValidity(
      "Nom invàlid: només es permeten lletres i espais."
    );
  } else {
    cognom.setCustomValidity("");
  }
});

// Validació email, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
email.addEventListener("input", function () {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email.value)) {
    email.setCustomValidity(
      "Introdueix un correu electrònic vàlid: name@example.com"
    );
  } else {
    email.setCustomValidity("");
  }
});

// Validació telèfon, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
telefon.addEventListener("input", function () {
  if (telefon.validity.patternMismatch) {
    telefon.setCustomValidity("El telèfon ha de contenir exactament 9 dígits.");
  } else {
    telefon.setCustomValidity("");
  }
});
