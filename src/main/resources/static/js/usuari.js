/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * ID de l'usuari emmagatzemat en el LocalStorage del navegador.
 */
const idUsuari = localStorage.getItem("idUsuari") || sessionStorage.getItem("idUsuari");
console.log(idUsuari);

/**
 * Event DOMContentLoaded per carregar les dades de l'usuari quan el DOM estigui carregat completament.
 * Si tenim l'usuari des de el localStorage monstra les dades, sino mostra error i torna a login.html
 */
document.addEventListener("DOMContentLoaded", function () {
  if (idUsuari) {
    mostraDadesUsuari();
  } else {
    console.error("No se encontró el idUsuari en localStorage.");
    //window.location.href = "/index.html"; ???????????????????????????????????????????
  }
});

/**
 * Funció asincroma per obtenir les dades de l'usuari desde la API
 * Si la resposta es correcta, mostra les dades de l'usuari a la interface.
 * @async
 * @function mostraDadesUsuari
 */
async function mostraDadesUsuari() {
  try {
    const response = await fetch(`${baseUrl}/api/usuari/${idUsuari}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const usuari = await response.json();
    //Mostrem les dades de l'usuari.
    document.getElementById("nomUsuari").textContent = usuari.nomUsuari;
    document.getElementById("nom").textContent = usuari.nom;
    document.getElementById("cognoms").textContent = usuari.cognoms;
    document.getElementById("email").textContent = usuari.email;
    document.getElementById("telefon").textContent = usuari.telefon;
    document.getElementById("password").textContent = usuari.password;
    // Si modifiquem l'avatar afegim a imgCanviar la foto, si no hi ha foto mostra la foto per defecte.
    document.getElementById("imgCanviar").src = usuari.foto || "/imatges/perfilLlop.jpeg";    
  } catch {
    console.error("Error en obtenir les dades de l'usuari:", error);
    alert("Error en carregar les dades de l'usuari. Torna a intentar-ho més tard.");
  }
}

/**
 * Funcionalitat per fer el canvi de imatge o avatar.
 * Fem un PUT a la api/usuaris per modificar i/o actualitzar la imatge.
 */
document.addEventListener("click", async function (event) {
  event.preventDefault();
  const targetBoto = event.target.closest("button");
  const imgCanviar = document.getElementById("imgCanviar");

  if (targetBoto && targetBoto.parentElement.id === "escollirImgPerfil") {
    //Obtenim la imatge
    const urlimatge = obtenirImatge(targetBoto.id);
    //Imatge a canviar
    imgCanviar.src = urlimatge;

    //Crear la petició PUT
    if (urlimatge) {
      try {
        let nom = document.getElementById("nom").textContent;
        let cognoms = document.getElementById("cognoms").textContent;
        let email = document.getElementById("email").textContent;
        let telefon = document.getElementById("telefon").textContent;
        let nomUsuari = document.getElementById("nomUsuari").textContent;
        let password = document.getElementById("password").textContent;

        const peticio = await fetch(`${baseUrl}/api/usuaris`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuari: idUsuari,
            nomUsuari: nomUsuari,
            password: password,
            foto: urlimatge,
            nom: nom,
            cognoms: cognoms,
            email: email,
            telefon: telefon,
            actiu: true,
          }),
        });

        if (!peticio.ok) {
          const errorMessage = await peticio.text();
          console.log("Error del servidor: ", errorMessage);
          throw new Error(`Error ${peticio.status}: ${errorMessage}`);
        } else {
          console.log("Imatge actualitzada correctament");
        }
      } catch (error) {
        console.error("Error durant la petició:", error);
        alert("Hi ha hagut un error al carregar la imatge.");
      }
    } else if (!urlimatge) {
      /**modifico aqui urlimatge por !urlimatge */
      alert("Selecciona una imatge abans de desar-la.");
    }
  }
});

/**
 * Funció que retorna el nom de la imatge en funció del id del botó.
 * @param {string}botonId - ID del botó seleccionat.
 * @returns {string} URL de la imatge corresponent.
 */
function obtenirImatge(botonId) {
  switch (botonId) {
    case "caball":
      return "/imatges/perfilCaball.jpeg";
    case "camaleo":
      return "/imatges/perfilCamaleo.jpeg";
    case "conill":
      return "/imatges/perfilConill.jpeg";
    case "dofi":
      return "/imatges/perfilDofi.jpeg";
    case "gall":
      return "/imatges/perfilGall.jpeg";
    case "gat":
      return "/imatges/perfilGat.jpeg";
    case "gos":
      return "/imatges/perfilgos.jpeg";
    case "llop":
      return "/imatges/perfilLlop.jpeg";
    case "pajaro":
      return "/imatges/perfilPajaro.jpeg";
    case "peix":
      return "/imatges/perfilPeix.jpeg";
    case "tigre":
      return "/imatges/perfilTigre.jpeg";
    case "tortola":
      return "/imatges/perfilTortola.jpeg";
    default:
      return "/imatges/perfilLlop.jpeg";
  }
}
