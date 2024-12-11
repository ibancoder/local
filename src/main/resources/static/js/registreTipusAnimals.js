/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Registra una nou tipus d'animal mitjançant una petició POST a l'API.
 * @async 
 * @function registrarTipusAnimals
 * @throws Mostra un missatge d'alerta si la validació de camps no es compleix o si la petició falla.
 */
let registrarTipusAnimals = async () => {
  // Obtenir els valors dels camps del formulari.
  let nomTipusAnimal = document.getElementById("nomTipusAnimal").value.trim();
  let foto = document.getElementById("foto").files[0];
  let alt = document.getElementById("alt").value.trim();

  // Verificar que tots els camps requerits tenen un valor.
  if (!nomTipusAnimal || !foto || !alt) {
    alert("Tots els camps són obligatoris.");
    return;
  }

  /**
   * Crear un objecte "FormData" amb els valors dels camps del formulari.
   * Això permet enviar dades de formulari, incloent-hi fitxers, en una petició HTTP.
   */
  let formData = new FormData();
  formData.append("nomTipusAnimal", nomTipusAnimal);
  formData.append("foto", foto);
  formData.append("alt", alt);

  //Crear la petició POST, crida a /api/tipusAnimals.
  try {
    const peticio = await fetch(`${baseUrl}/api/tipusAnimals`, {
      method: "POST",
      body: formData,
    });

    //Comprovar que la petició ha estat satisfactoria.
    if (!peticio.ok) {
      const errorMessage = await peticio.text();
      console.log("Error del servidor: ", errorMessage);
      throw new Error(`Error ${peticio.status}: ${errorMessage}`);
    }

    //Resposta de la petició i si es satisfactoria netejarFormulari, sino dona error.
    const resposta = await peticio.json();
    alert("Tipus d'animal registrat correctament!");
    netejarFormulari();
  } catch (error) {
    console.error("Error durant la petició:", error);
    alert("Hi ha hagut un error en registrar el tipus d'animal.");
  }
};

/**
 * Funció per netejar el formulari després de registrar una tipus d'animal.
 * @function netejarFormulari
 */
function netejarFormulari() {
  document.getElementById("nomTipusAnimal").value = "";
  document.getElementById("foto").value = "";
  document.getElementById("alt").value = "";
}

// Botó per registrar la notícia.
let boto = document.getElementById("btnRegistre");
/**
 * Afegim un esdeveniment "click" al botó de registre per evitar que el formulari es
 * carregui de manera predeterminada i per cridar la funció "registrarNoticies".
 */
boto.addEventListener("click", (event) => {
  event.preventDefault();
  registrarTipusAnimals().catch((error) => {
    console.error("Uncaught error: ", error);
    alert("S'ha produït un error inesperat.");
  });
});
