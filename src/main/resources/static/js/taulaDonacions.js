/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaDonacions.
 * @function llistaDonacions
 */
window.onload = function () {
  llistaDonacions();
};

/**
 * LLista de les donacions en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista de les donacions i mostrar-los.
 * @async
 * @function llistaDonacions
 */
let llistaDonacions = async () => {
  const peticio = await fetch(`${baseUrl}/api/donacions`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const donacions = await peticio.json();

  let contingutTaula = "";
  for (let donacio of donacions) {
    const idUsuari = donacio.usuaris ? donacio.usuaris.idUsuari : "No assignat";
    const nomUsuari = donacio.usuaris ? donacio.usuaris.nomUsuari : "No assignat";    

    let contingutFila = `<tr>
        <td>${donacio.idDonacio}</td>  
        <td>${donacio.dataDonacio}</td>        
        <td>${donacio.quantitat}</td>        
        <td>${idUsuari}</td>
        <td>${nomUsuari}</td>
        <td><i onClick="editarDonacio(${donacio.idDonacio})" class="material-icons button edit">edit</i></td>
        <td><i onClick="eliminarDonacio(${donacio.idDonacio})" class="material-icons button delete">delete</i></td>
        </tr>`;
    contingutTaula += contingutFila;
  }
  //Mostrem les donacions a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarDonació *****
 * Mètode DELETE de l'API per eliminar una donació. Un cop eliminat,
 * actualitza la llista de les donacions i amaga el formulari.
 * @param {*} idDonacio - L'identificador de la donació a eliminar
 * @function eliminarDonacio
 */
let eliminarDonacio = async (idDonacio) => {
  //Missatge de confirmació abans d'eliminar la donació.
  const confirmacio = window.confirm("Estàs segur que vols eliminar aquesta donació?");
   if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/donacio/${idDonacio}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació té éxit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaDonacions();
        amagarFormulari();
      } else {
        alert("No s'ha pogut eliminar la donació. Si us plau, intenta-ho més tard.");
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarDonació *****
 * Mètode GET de l'API per obtenir la informació d'una donació mitjançant el ID per editar-lo.
 * @async
 * @function editarDonacio
 * @param {number} idDonacio - L'identificador de la donació a editar.
 */
let idEditar;
let editarDonacio = async (idDonacio) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idDonacio;
  const peticio = await fetch(`${baseUrl}/api/donacio/${idDonacio}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const donacio = await peticio.json();
  document.getElementById("dataDonacio").value = donacio.dataDonacio;
  document.getElementById("quantitat").value = donacio.quantitat;    
  document.getElementById("idUsuari").value = donacio.usuaris.idUsuari;  
};

/**
 * En fer click al botó modificar aplicarà les actualitzacions.
 */
let btnModificarDonacio = document.getElementById("btnModificarDonacio");
btnModificarDonacio.addEventListener("click", (event) => {
  event.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'una donació.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idDonacio - L'identificador de la donació a modificar.
 */
let aplicarActualitzacio = async (idDonacio) => {
  let donacio = {};
  donacio.idDonacio = idDonacio;
  donacio.dataDonacio = document.getElementById("dataDonacio").value;  
  donacio.quantitat = document.getElementById("quantitat").value;
  donacio.usuaris = {idUsuari: parseInt(document.getElementById("idUsuari").value, 10),};
  
  // Validació del valor de idUsuari abans d'enviar la sol.licitud.
  if (!donacio.usuaris.idUsuari || isNaN(donacio.usuaris.idUsuari)) {alert("L'usuari és incorrecte.");
    return;
  }

  /**
   * Petició PUT a l'API.
   */
  try {
    const peticio = await fetch(`${baseUrl}/api/donacions`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donacio),
    });

    if (peticio.ok) {
      llistaDonacions();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar la donació.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Error de conexión o en el servidor.");
  }
};

/**
 * Funció per fer visible el formulari ocult.
 * @function mostrarFormulari
 */
function mostrarFormulari() {
  let formulari = (document.getElementById("formulario").style.visibility =
    "visible");
}

/**
 * Funció per fer scroll i anar a la part del formulari en clicar el botó modificar.
 * @function scrollFormulari
 */
function scrollFormulari() {
  setTimeout(() => {
    document
      .getElementById("formulario")
      .scrollIntoView({ behavior: "smooth" });
  }, 200);
}

/**
 * Funció per amagar el formulari visible.
 * @function amagarFormulari
 */
function amagarFormulari() {
  document.getElementById("formulario").style.visibility = "hidden";
}

/**
 * Funció per netejar el formulari deixaant els camps en blanc.
 * @function netejarFormulari
 */
function netejarFormulari() {
  document.getElementById("dataDonacio").value = "";
  document.getElementById("quantitat").value = "";  
  document.getElementById("idUsuari").value = "";  
}
