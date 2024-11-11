/*********************** URL *********************************/
// const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

// Botó per registrar la notícia.
let boto = document.getElementById("btnRegistre");
/**
 * Afegim un esdeveniment "click" al botó de registre per evitar que el formulari es
 * carregui de manera predeterminada i per cridar la funció "registrarNoticies".
 */
boto.addEventListener("click", (event) => {
  event.preventDefault();
  registrarNoticies();
});

/**
 * Registra una notícia amb totes les seves dades mitjançant una petició POST a l'API.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function registrarNoticies
 * @throws Mostra un missatge d'alerta si la validació de camps no es compleix o si la petició falla.
 */
let registrarNoticies = async () => {
  // Obtenir i netejar els valors dels camps del formulari.
  let dataNoticia = document.getElementById("dataNoticia").value.trim();
  let titol = document.getElementById("titol").value.trim();
  let descripcio = document.getElementById("descripcio").value.trim();
  let foto = document.getElementById("foto").files[0];
  let alt = document.getElementById("alt").value.trim();
  let urlNoticia = document.getElementById("urlNoticia").value.trim();
  let nomBoto = document.getElementById("nomBoto").value.trim();
  let activa = document.getElementById("activa").checked;

  // Verificar que tots els camps requerits tenen un valor.
  if (
    !dataNoticia ||
    !titol ||
    !descripcio ||
    !foto ||
    !alt ||
    !urlNoticia ||
    !nomBoto
  ) {
    alert("Tots els camps són obligatoris.");
    return;
  }

  /**
   * Crear un objecte "FormData" amb els valors dels camps del formulari.
   * Això permet enviar dades de formulari, incloent-hi fitxers, en una petició HTTP.
   */
  let formData = new FormData();
  formData.append("dataNoticia", dataNoticia);
  formData.append("titol", titol);
  formData.append("descripcio", descripcio);
  formData.append("foto", foto);
  formData.append("alt", alt);
  formData.append("urlNoticia", urlNoticia);
  formData.append("nomBoto", nomBoto);
  formData.append("activa", activa);

  // Crear la petició POST, crida a /api/noticies.
  try {
    const peticio = await fetch(`${baseUrl}/api/noticies`, {
      method: "POST",
      body: formData,
    });

    // Comprovar que la petició ha estat satisfactoria.
    if (!peticio.ok) {
      const errorMessage = await peticio.text();
      console.log("Error del servidor: ", errorMessage);
      throw new Error(`Error ${peticio.status}: ${errorMessage}`);
    }

    // Resposta de la petició i si es satisfactoria netejarFormulari, sino dona error.
    const resposta = await peticio.json();
    alert("Noticia registrada correctament!");
    netejarFormulari();
  } catch (error) {
    console.error("Error durant la petició:", error);
    alert("Hi ha hagut un error en registrar la noticia.");
  }

  /**
   * Funció per netejar el formulari després de registrar una notícia correctament.
   * @function
   */
  function netejarFormulari() {
    document.getElementById("dataNoticia").value = "";
    document.getElementById("titol").value = "";
    document.getElementById("descripcio").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("alt").value = "";
    document.getElementById("urlNoticia").value = "";
    document.getElementById("nomBoto").value = "";
    document.getElementById("activa").checked = false;
  }
};
