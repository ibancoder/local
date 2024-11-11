/*********************** URL *********************************/
// const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

//*** FORMULARI ***/
const form = document.getElementById("formulari");

//*** INPUTS ***/
const nom = document.getElementById("inputNom");
const cognoms = document.getElementById("inputCognoms");
const email = document.getElementById("inputEmail");
const telefon = document.getElementById("inputTelefon");
const nomUsuari = document.getElementById("inputNomUsuari");
const password = document.getElementById("inputPassword");
const password2 = document.getElementById("inputPassword2");

//*** REGEX **/
const nomCognomRegex = /[A-Za-zÀ-ÿ\s]+/;
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const telefonRegex = /^\d{9}$/;
const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  
//*** BOOLEAN **/
const estatValidacionsCamp = {
  nom: false,
  cognoms: false,
  email: false,
  telefon: false,
  nomUsuari: false,
  password: false,
};

/**
 * Inicia el registre en carregar la pàgina, associant els esdeveniments de validació a cada camp del formulari.
 */
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    validarFormulari();
  });

  //Validem nom, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  nom.addEventListener("input", () => {
    validarCamp(
      nomCognomRegex,
      nom,
      "Nom invàlid: només permés lletres i espais."
    );
  });

  //Validem cognoms, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  cognoms.addEventListener("input", () => {
    validarCamp(
      nomCognomRegex,
      cognoms,
      "Cognoms invàlids: només permés lletres i espais."
    );
  });

  //Validem email, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  email.addEventListener("input", () => {
    validarCamp(emailRegex, email, "Email amb format: name@exemple.com");
  });

  //Validem telèfon, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  telefon.addEventListener("input", () => {
    validarCamp(telefonRegex, telefon, "Telèfon només 9 dígits.");
  });

  //Validem usuari, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  nomUsuari.addEventListener("input", () => {
    validarCamp(
      userNameRegex,
      nomUsuari,
      "Usuari conté mínim 4 i màxim 16 caràcters."
    );
  });

  //Validem password, si el valor no compleix el patró esperat, mostra missatge d'error personalitzat.
  password.addEventListener("input", () => {
    validarCamp(
      passwordPattern,
      password,
      "Password conté mín 8 i máx 15 caràcters, inclou lletra majúscula, lletra minúscula, número i caràcter especial."
    );
  });

  //Validem que els dos passwords siguin iguals.
  password2.addEventListener("input", () => {
    if (password.value !== password2.value) {
      password2.setCustomValidity("Les contrasenyes no coincideixen.");
    } else {
      password2.setCustomValidity("");
    }
  });
});

/**
 * Funció que valida un camp mitjançant una expressió regular.
 * Utilitzem una expressió regular per fer la vacidació, el camp del imput i el missatge.
 * Si els camps es validen, eliminem l'alerta (missatges) i posem els camps validats a true.
 * Si els camps no es validen, mostrem alerta (missatge) i deixem el focus al imput.
 * @param {RegExp} regularExpression Expressió regular per validar.
 * @param {HTMLInputElement} camp Camp que es vol validar.
 * @param {string} missatge Missatge d'error en cas de fallada.
 */
function validarCamp(regularExpression, camp, missatge) {
  const validarCamp = regularExpression.test(camp.value);
  if (validarCamp) {
    eliminarAlerta(camp.parentElement);
    estatValidacionsCamp[camp.name] = true;
    return;
  } else {
    mostrarAlerta(camp.parentElement, missatge);
    camp.focus();
  }
}

/**
 * Funció per mostrar els alerts (missatges) en cas de validació fallida.
 * Eliminem alerta que es repeteix, creem un div, afegim la classe alerta, mostrem missatge.
 * @param {HTMLElement} referencia Element on es mostrarà el missatge.
 * @param {string} missatge Text del missatge d'error.
 */
function mostrarAlerta(referencia, missatge) {
  eliminarAlerta(referencia);
  const alertaDiv = document.createElement("div");
  alertaDiv.classList.add("alerta");
  alertaDiv.textContent = missatge;
  referencia.appendChild(alertaDiv);
}

/**
 * Funció per eliminar els missatges d'error si existeix.
 * @param{HTMLElement} referencia Element on es troba el missatge d'error.
 */
function eliminarAlerta(referencia) {
  const alerta = referencia.querySelector(".alerta");
  if (alerta) {
    alerta.remove();
  }
}

/**
 * Funció per validar el formulari.
 * Si els estats de validació dels camps son true, registra a l'usuari.
 * Si els estats no son true, mostra a consola, formulari incorrecte.
 */
function validarFormulari() {
  if (
    estatValidacionsCamp.nom &&
    estatValidacionsCamp.cognoms &&
    estatValidacionsCamp.email &&
    estatValidacionsCamp.telefon &&
    estatValidacionsCamp.nomUsuari &&
    estatValidacionsCamp.password
  ) {
    registrarUsuari();
  } else {
    console.log("Formulari incorrecte");
  }
}

/**
 * Funció que fa la petició POST a la API i fa el registre de l'usuari a la base de dades.
 */
let registrarUsuari = async () => {
  let formData = new FormData();
  formData.append("nom", nom.value);
  formData.append("cognoms", cognoms.value);
  formData.append("email", email.value);
  formData.append("telefon", telefon.value);
  formData.append("nomUsuari", nomUsuari.value);
  formData.append("password", password.value);

  // Mostrar el contingut del FormData a la consola
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  //Crear la petició POST a la api/usuaris
  try {
    const peticio = await fetch(`${baseUrl}/api/usuaris`, {
      method: "POST",
      body: formData,
    });

    if (peticio.status === 409) {
      const errorMessage = await peticio.text();
      alert(errorMessage);
      return;
    }

    if (!peticio.ok) {
      const errorMessage = await peticio.text();
      console.log("Error del servidor: ", errorMessage);
      throw new Error(`Error ${peticio.status}: ${errorMessage}`);
    }

    // Resposta de la petició
    const resposta = await peticio.json();
    alert("Usuari registrat correctament!");
    netejarFormulari();
    //mostrarLogin();****************pendent **************??????????????????
  } catch (error) {
    console.error("Error durant la petició:", error);
    alert("Hi ha hagut un error en registrar l'usuari.");
  }
};

/**
 * Funció per netejar els camps del formulari.
 */
function netejarFormulari() {
  document.getElementById("inputNom").value = "";
  document.getElementById("inputCognoms").value = "";
  document.getElementById("inputEmail").value = "";
  document.getElementById("inputTelefon").value = "";
  document.getElementById("inputNomUsuari").value = "";
  document.getElementById("inputPassword").value = "";
  document.getElementById("inputPassword2").value = "";
  document.getElementById("proteccioDades").checked = false;
}

/**
 * Funció per mostrar el login de nou per iniciar sessió  ???????????????????
 */
function mostrarLogin() {
  const divLogin = document.getElementById("login");
  console.log("divlogin:"+divLogin)
  //Mostrar la div
  divLogin.style.display = "block";
  //Desplaçar cap a dal
  divLogin.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Funció per esborrar el password en clicar a l'icona de la paperera.
 * @param {string} inputId ID de l'input de contrasenya
 */
function esborrarPass(inputId) {
  const inputField = document.getElementById(inputId);
  inputField.value = "";
}

/**
 * Funció per mostrar/amagar el password amb l'icona de l'ull.
 * @param {string} inputId ID de l'input de contrasenya
 * @param {HTMLImageElement} icon Icona per indicar l'estat de visibilitat
 */
function passVisible(inputId, icon) {
  const inputField = document.getElementById(inputId);
  const isPassword = inputField.type === "password";
  //Canvia el tipus de input
  inputField.type = isPassword ? "text" : "password";
  //Canvia l'icona segons l'estat
  icon.src = isPassword ? "imatges/open.png" : "imatges/close.png";
}
