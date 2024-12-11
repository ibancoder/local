/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaAnimals.
 * @function llistaApadrinats
 */
window.onload = function () {
  llistaApadrinats();
};

/**
 * LLista dels animals apadrinats en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista dels animals apadrinats i mostrar-los.
 * @async
 * @function llistaApadrinats
 */
let llistaApadrinats = async () => {
  const peticio = await fetch(`${baseUrl}/api/apadrinats`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const apadrinats = await peticio.json();

  let contingutTaula = "";
  for (let apadrinat of apadrinats) {
    const idAnimal = apadrinat.animals ? apadrinat.animals.idAnimal : "No assignat";
    const nomAnimal = apadrinat.animals ? apadrinat.animals.nomAnimal : "No assignat";
    
    const idUsuari = apadrinat.usuaris ? apadrinat.usuaris.idUsuari : "No assignat";
    const nomUsuari = apadrinat.usuaris ? apadrinat.usuaris.nomUsuari : "No assignat";    

    let contingutFila = `<tr>
        <td>${apadrinat.idRelacio}</td>  
        <td>${apadrinat.dataAlta}</td>
        <td>${apadrinat.dataBaixa}</td>
        <td>${apadrinat.quotaMensual}</td>
        <td>${idAnimal}</td>  
        <td>${nomAnimal}</td>    
        <td>${idUsuari}</td>
        <td>${nomUsuari}</td>
        <td><i onClick="editarApadrinat(${apadrinat.idRelacio})" class="material-icons button edit">edit</i></td>
        <td><i onClick="eliminarApadrinat(${apadrinat.idRelacio})" class="material-icons button delete">delete</i></td>
        </tr>`;
    contingutTaula += contingutFila;
  }
  //Mostrem els animals a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarAnimalApadrinat *****
 * Mètode DELETE de l'API per eliminar un animal apadrinat. Un cop eliminat,
 * actualitza la llista dels apadrinaments i amaga el formulari.
 * @param {*} idRelacio - L'identificador de l'animal a eliminar
 * @function eliminarApadrinat
 */
let eliminarApadrinat = async (idRelacio) => {
  console.log(idRelacio);
  //Missatge de confirmació abans d'eliminar l'animal apadrinat.
  const confirmacio = window.confirm("Estàs segur que vols eliminar aquest apadrinament?");
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/apadrinat/${idRelacio}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació té éxit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaApadrinats();
        amagarFormulari();
      } else {
        alert(
          "No s'ha pogut eliminar l'apadrinament. Si us plau, intenta-ho més tard."
        );
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarApadrinament *****
 * Mètode GET de l'API per obtenir la informació d'un apadrinament mitjançant el ID per editar-lo.
 * @async
 * @function editarApadrinat
 * @param {number} idRelacio - L'identificador de l'apadrinament a editar.
 */
let idEditar;
let editarApadrinat = async (idRelacio) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idRelacio;
  const peticio = await fetch(`${baseUrl}/api/apadrinat/${idRelacio}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const apadrinat = await peticio.json();
  document.getElementById("dataAlta").value = apadrinat.dataAlta;
  document.getElementById("dataBaixa").value = apadrinat.dataBaixa;
  document.getElementById("quotaMensual").value = apadrinat.quotaMensual;
  document.getElementById("idAnimal").value = apadrinat.animals.idAnimal;  
  document.getElementById("idUsuari").value = apadrinat.usuaris.idUsuari;  
};

/**
 * En fer click al botó modificar aplicarà les actualitzacions.
 */
let btnModificarApadrinat = document.getElementById("btnModificarApadrinat");
btnModificarApadrinat.addEventListener("click", (event) => {
  event.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'un apadrinament.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idRelacio - L'identificador de l'apadrinament a modificar.
 */
let aplicarActualitzacio = async (idRelacio) => {
  let apadrinat = {};
  apadrinat.idRelacio = idRelacio;
  apadrinat.dataAlta = document.getElementById("dataAlta").value;
  apadrinat.dataBaixa = document.getElementById("dataBaixa").value;
  apadrinat.quotaMensual = document.getElementById("quotaMensual").value;
  apadrinat.animals = {idAnimal: parseInt(document.getElementById("idAnimal").value, 10),};
  apadrinat.usuaris = {idUsuari: parseInt(document.getElementById("idUsuari").value, 10),};
  
  // Validació del valor de idAnimal abans d'enviar la sol.licitud.
  if (!apadrinat.animals.idAnimal || isNaN(apadrinat.animals.idAnimal)) { alert("L'animal és incorrecte.");
     return;
  }

  // Validació del valor de idUsuari abans d'enviar la sol.licitud.
  if (!apadrinat.usuaris.idUsuari || isNaN(apadrinat.usuaris.idUsuari)) {alert("L'usuari és incorrecte.");
    return;
  }

  /**
   * Petició PUT a l'API.
   */
  try {
    const peticio = await fetch(`${baseUrl}/api/apadrinats`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apadrinat),
    });

    if (peticio.ok) {
      llistaApadrinats();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar l'apadrinament.");
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
 * Funció per netejar el formulari.
 * @function netejarFormulari
 */
function netejarFormulari() {
  document.getElementById("dataAlta").value = "";
  document.getElementById("dataBaixa").value = "";
  document.getElementById("quotaMensual").value = "";
  document.getElementById("idAnimal").value = "";  
  document.getElementById("idUsuari").value = "";  
}
