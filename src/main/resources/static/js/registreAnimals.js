/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

document.addEventListener("DOMContentLoaded", () => {
  // Botó per registrar la notícia.
  let botoAnimals = document.getElementById("btnRegistreAnimal");
  if (botoAnimals) {
    /**
     * Afegim un esdeveniment "click" al botó de registre per evitar que el formulari es
     * carregui de manera predeterminada i per cridar la funció "registrarAnimals".
     */
    botoAnimals.addEventListener("click", (event) => {
      event.preventDefault();
      registrarAnimals();
    });
  } else {
    console.error("El botó amb 'btnRegistreAnimal' no s'ha trobat al DOM");
  }
});

/**
 * Registra un animal amb totes les seves dades mitjançant una petició POST a l'API.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function registrarAnimals
 * @throws Mostra un missatge d'alerta si la validació de camps no es compleix o si la petició falla.
 */
let registrarAnimals = async () => {
  let nomAnimal = document.getElementById("nomAnimal").value.trim();
  let dataEntrada = document.getElementById("dataEntrada").value.trim();
  let idTipusAnimal = document.getElementById("idTipusAnimal").value.trim();
  let estatSalut = document.getElementById("estatSalut").value.trim();
  let estatAnimal = document.getElementById("estatAnimal").value.trim();
  let sexe = document.getElementById("sexe").value.trim();
  let tipusRaca = document.getElementById("tipusRaca").value.trim();
  let color = document.getElementById("color").value.trim();
  let edat = document.getElementById("edat").value.trim();
  let pes = document.getElementById("pes").value.trim();
  let mida = document.getElementById("mida").value.trim();
  let xip = document.getElementById("xip").value.trim();
  let comportament = document.getElementById("comportament").value.trim();
  let necessitats = document.getElementById("necessitats").value.trim();
  let foto = document.getElementById("foto").files[0];
  let alt = document.getElementById("alt").value.trim();
  let observacions = document.getElementById("observacions").value.trim();
  let esterilitzat = document.getElementById("esterilitzat").checked;
  let vacunat = document.getElementById("vacunat").checked;
  let rip = document.getElementById("rip").checked;

  // Verificar que tots els camps requerits tenen un valor.
  if (
    !nomAnimal ||
    !dataEntrada ||
    !idTipusAnimal ||
    !estatSalut ||
    !estatAnimal ||
    !sexe ||
    !tipusRaca ||
    !color ||
    !edat ||
    !pes ||
    !mida ||
    !xip ||
    !comportament ||
    !necessitats ||
    !foto ||
    !alt ||
    !observacions
  ) {
    alert("Tots els camps són obligatoris!");
    return;
  }
  /**
   * Crear un objecte "FormData" amb els valors dels camps del formulari.
   * Això permet enviar dades de formulari, incloent-hi fitxers, en una petició HTTP.
   */
  let formData = new FormData();
  formData.append("nomAnimal", nomAnimal);
  formData.append("dataEntrada", dataEntrada);
  formData.append("idTipusAnimal", idTipusAnimal);
  formData.append("estatSalut", estatSalut);
  formData.append("estatAnimal", estatAnimal);
  formData.append("sexe", sexe);
  formData.append("tipusRaca", tipusRaca);
  formData.append("color", color);
  formData.append("edat", edat);
  formData.append("pes", pes);
  formData.append("mida", mida);
  formData.append("xip", xip);
  formData.append("comportament", comportament);
  formData.append("necessitats", necessitats);
  formData.append("foto", foto);
  formData.append("alt", alt);
  formData.append("observacions", observacions);
  formData.append("esterilitzat", esterilitzat);
  formData.append("vacunat", vacunat);
  formData.append("rip", rip);

  //Crear la petició POST, crida a /api/animals.
  try {
    const peticio = await fetch(`${baseUrl}/api/animals`, {
      method: "POST",
      body: formData,
    });

    // Usar forEach con FormData
    Array.from(formData.entries()).forEach(([clave, valor]) => {
      console.log(`${clave}:`, valor);
    });

    // Comprovar que la petició ha estat satisfactoria.
    if (!peticio.ok) {
      const errorMessage = await peticio.text();
      console.log("Error del servidor: ", errorMessage);
      throw new Error(`Error ${peticio.status}: ${errorMessage}`);
    }

    // Resposta de la petició i si es satisfactoria netejarFormulari, sino dona error.
    const resposta = await peticio.json();
    alert("Animal registrat correctament!");
    netejarFormulari();
  } catch (error) {
    console.error("Error durant la petició:", error);
    alert("Hi ha hagut un error en registrar l'animal.");
  }

  /**
   * Funció per netejar el formulari després de registrar un animal correctament.
   * @function netejarFormulari
   */
  function netejarFormulari() {
    document.getElementById("nomAnimal").value = "";
    document.getElementById("dataEntrada").value = "";
    document.getElementById("idTipusAnimal").value;
    document.getElementById("estatSalut").value;
    document.getElementById("estatAnimal").value;
    document.getElementById("tipusRaca").value = "";
    document.getElementById("sexe").value = "";
    document.getElementById("color").value = "";
    document.getElementById("edat").value = "";
    document.getElementById("pes").value = "";
    document.getElementById("mida").value = "";
    document.getElementById("xip").value = "";
    document.getElementById("comportament").value = "";
    document.getElementById("necessitats").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("alt").value = "";
    document.getElementById("observacions").value = "";
    document.getElementById("esterilitzat").checked = false;
    document.getElementById("rip").checked = false;
  }
};
