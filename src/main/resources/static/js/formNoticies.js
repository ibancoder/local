let boto = document.getElementById("btnRegistre");

boto.addEventListener("click", (event) => {
  event.preventDefault();
  registrarNoticies();
});

// const baseUrl = "http://178.156.55.174:1234";   // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local
/**
 * Funció per registrar la notícia.
 */
let registrarNoticies = async () => {
  let dataNoticia = document.getElementById("dataNoticia").value.trim();
  
  let titol = document.getElementById("titol").value.trim();
  console.log("Titol : " + titol);
  let descripcio = document.getElementById("descripcio").value.trim();
  console.log("Descripcio: " +descripcio);
  let foto = document.getElementById("foto").files[0];
  console.log("Foto: " + foto);
  let alt = document.getElementById("alt").value.trim();
  console.log("Alt: " + alt);
  let urlNoticia = document.getElementById("urlNoticia").value.trim();
  console.log("UrlNoticia: " + urlNoticia);
  let nomBoto = document.getElementById("nomBoto").value.trim();
  console.log("NomBoto: " + nomBoto);
  let activa = document.getElementById("activa").checked;
  console.log("Activa: " + activa);

  if (
    !dataNoticia || !titol || !descripcio || !foto || !alt || !urlNoticia || !nomBoto ) {
    alert("Tots els camps són obligatoris.");
    return;
  }

  let formData = new FormData();
  formData.append("dataNoticia", dataNoticia);
  formData.append("titol", titol);
  formData.append("descripcio", descripcio);
  formData.append("foto", foto);
  formData.append("alt", alt);
  formData.append("urlNoticia", urlNoticia);
  formData.append("nomBoto", nomBoto);
  formData.append("activa", activa);

  // Crear la petició POST
  try {
    const peticio = await fetch(`${baseUrl}/api/noticies`, {
      method: "POST", 
      body: formData,
    });

    if (!peticio.ok) {
      const errorMessage = await peticio.text(); 
      console.log("Error del servidor: ", errorMessage); 
      throw new Error(`Error ${peticio.status}: ${errorMessage}`);
    }

    // Resposta de la petició
    const resposta = await peticio.json();
    alert("Noticia registrada correctament!");
    netejarFormulari();
  } catch (error) {
    console.error("Error durant la petició:", error);
    alert("Hi ha hagut un error en registrar la noticia.");
  }

  /**
   * Funció per netejar el formulari
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
