/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaAdoptats.
 */
window.onload = function () {
  llistaAdoptats();
};

/**
 * LLista dels animals adoptats en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista dels animals adoptats i mostrar-los.
 * @async
 * @function llistaAdoptats
 * @throws {Error} Mostra un error si la petició falla o la resposta no és vàlida.
 * @returns {Promise<void>} No retorna cap resultat, però actualitza la taula HTML amb les dades rebudes.
 */
let llistaAdoptats = async () => {
  const peticio = await fetch(`${baseUrl}/api/adoptats`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const adoptats = await peticio.json();

  let contingutTaula = "";
  for (let adoptat of adoptats) {
    const idAnimal = adoptat.animals ? adoptat.animals.idAnimal : "No assignat";
    const nomAnimal = adoptat.animals ? adoptat.animals.nomAnimal : "No assignat";

    const idUsuari = adoptat.usuaris ? adoptat.usuaris.idUsuari : "No assignat";
    const nomUsuari = adoptat.usuaris ? adoptat.usuaris.nomUsuari : "No assignat";

    let contingutFila = `<tr>
        <td>${adoptat.idRelacio}</td>  
        <td>${adoptat.dataAlta}</td>
        <td>${adoptat.dataBaixa}</td>        
        <td>${idAnimal}</td>  
        <td>${nomAnimal}</td>    
        <td>${idUsuari}</td>
        <td>${nomUsuari}</td>
        <td><i onClick="editarAdoptat(${adoptat.idRelacio})" class="material-icons button edit">edit</i></td>
        <td><i onClick="eliminarAdoptat(${adoptat.idRelacio})" class="material-icons button delete">delete</i></td>
        </tr>`;
    contingutTaula += contingutFila;
  }
  //Mostrem els animals adoptats a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarAnimalAdoptat *****
 * Mètode DELETE de l'API per eliminar un animal adoptat. Un cop eliminat,
 * actualitza la llista dels adoptats i amaga el formulari.
 * @param {number} idRelacio - L'identificador de l'animal a eliminar.
 * @function eliminarAdoptat
 */
let eliminarAdoptat = async (idRelacio) => {
  console.log(idRelacio);
  //Missatge de confirmació abans d'eliminar l'animal adoptat.
  const confirmacio = window.confirm("Estàs segur que vols eliminar aquesta adopció?");
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/adoptat/${idRelacio}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació té éxit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaAdoptats();
        amagarFormulari();
      } else {
        alert("No s'ha pogut eliminar l'adopció. Si us plau, intenta-ho més tard.");
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarAdopció *****
 * Mètode GET de l'API per obtenir la informació d'una adopció mitjançant el ID per editar-lo.
 * @async
 * @function EditarAdopció
 * @param {number} idRelacio - L'identificador de l'adopció a editar.
 */
let idEditar;
let editarAdoptat = async (idRelacio) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idRelacio;
  const peticio = await fetch(`${baseUrl}/api/adoptat/${idRelacio}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const adoptat = await peticio.json();
  document.getElementById("dataAlta").value = adoptat.dataAlta;
  document.getElementById("dataBaixa").value = adoptat.dataBaixa;
  document.getElementById("idAnimal").value = adoptat.animals.idAnimal;
  document.getElementById("idUsuari").value = adoptat.usuaris.idUsuari;
};

/**
 * En fer click al botó modificar aplicarà les actualitzacions.
 */
let btnModificarAdoptat = document.getElementById("btnModificarAdoptat");
btnModificarAdoptat.addEventListener("click", (event) => {
  event.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'una adopció.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idRelacio - L'identificador de l'adopció a modificar.
 */
let aplicarActualitzacio = async (idRelacio) => {
  let adoptat = {};
  adoptat.idRelacio = idRelacio;
  adoptat.dataAlta = document.getElementById("dataAlta").value;
  adoptat.dataBaixa = document.getElementById("dataBaixa").value;
  adoptat.animals = { idAnimal: parseInt(document.getElementById("idAnimal").value, 10), };
  adoptat.usuaris = { idUsuari: parseInt(document.getElementById("idUsuari").value, 10), };

  // Validació del valor de idAnimal abans d'enviar la sol.licitud.
  if (!adoptat.animals.idAnimal || isNaN(adoptat.animals.idAnimal)) {
    alert("L'animal és incorrecte.");
    return;
  }

  // Validació del valor de idUsuari abans d'enviar la sol.licitud.
  if (!adoptat.usuaris.idUsuari || isNaN(adoptat.usuaris.idUsuari)) {
    alert("L'usuari és incorrecte.");
    return;
  }

  /**
   * Petició PUT a l'API.
   */
  try {
    const peticio = await fetch(`${baseUrl}/api/adoptats`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adoptat),
    });

    if (peticio.ok) {
      llistaAdoptats();
      netejarFormulari();
      amagarFormulari();
      // Si hi ha dataBaixa, canviar l'estat de l'animal
      if (adoptat.dataBaixa) {
        actualitzarEstat(adoptat);
      }
    } else {
      alert("Error al modificar l'adopció.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Error de conexión o en el servidor.");
  }
};

/**
 * ***** ActualitzarEstat *****
 * Actualitza l'estat d'un animal a "0" (lliure) quan una adopció té una data de baixa.
 * Obté les dades completes de l'animal des del backend, modifica el camp `estatAnimal`
 * i envia l'actualització mitjançant una petició PUT.
 * 
 * @async
 * @function actualitzarEstat
 * @param {Object} adoptat - Objecte que conté informació de l'adopció.
 * @param {Object} adoptat.animals - Dades relacionades amb l'animal de l'adopció.
 * @param {number} adoptat.animals.idAnimal - L'identificador únic de l'animal.
 * @throws {Error} Si hi ha algun problema amb la connexió o la resposta del servidor.
 */
async function actualitzarEstat(adoptat) {
  try {
    // Obtenir l'animal complet
    const resposta = await fetch(`${baseUrl}/api/animal/${adoptat.animals.idAnimal}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!resposta.ok) {
      throw new Error(
        `Error ${resposta.status}: No s'ha pogut obtenir l'animal.`
      );
    }

    // Convertir la resposta a JSON
    const animal = await resposta.json();

    // Actualitzar només el camp 'estat'
    animal.estatAnimal = 0;

    // Enviar l'animal actualitzat al backend
    const peticio = await fetch(`${baseUrl}/api/animals`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal), // Enviar l'objecte complet
    });

    if (!peticio.ok) {
      throw new Error(
        `Error ${peticio.status}: No s'ha pogut actualitzar l'animal.`
      );
    }

    alert("L'estat de l'animal s'ha actualitzat correctament!");

  } catch (error) {
    console.error("Error en la sol·licitud:", error);
    alert("Error de connexió o en el servidor.");
  }
}

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
  document.getElementById("idAnimal").value = "";
  document.getElementById("idUsuari").value = "";
}
