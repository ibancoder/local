/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaTipusAnimals.
 * @function llistaTipusAnimals
 */
window.onload = function () {
  llistaTipusAnimals();
};

/**
 * LLista dels tipus d'animals en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista dels tipus d'animals i mostrar-los.
 * @async 
 * @function llistaTipusAnimals
 */
let llistaTipusAnimals = async () => {
  const peticio = await fetch(`${baseUrl}/api/tipusAnimals`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const tipusAnimals = await peticio.json();

  let contingutTaula = "";
  for (let tipusAnimal of tipusAnimals) {
    const imageUrl = tipusAnimal.foto ? `${baseUrl}/imatges/${tipusAnimal.foto}`: "";
    
    let contingutFila = `<tr>
    <td>${tipusAnimal.idTipusAnimal}</td>
    <td>${tipusAnimal.nomTipusAnimal}</td>
    <td>${imageUrl ? `<img src="${imageUrl}" class="img-fluid" width="200" height="200" />`: ""}</td>
    <td>${tipusAnimal.alt}</td>
    <td><i onClick="editarTipusAnimal(${tipusAnimal.idTipusAnimal})" class="material-icons button edit">edit</i></td>
    <td><i onClick="eliminarTipusAnimal(${tipusAnimal.idTipusAnimal})" class="material-icons button delete">delete</i></td>
    </tr>`;
    contingutTaula += contingutFila;
  }
  //Mostrem els tipus d'animals a la taula.
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** Eliminar el tipus d'animal ****
 * Mètode DELETE de l'API per eliminar un tipus d'animal. Un cop eliminat,
 * actualitza la llista de tipus d'animals i amaga el formulari.
 * @async
 * @function eliminarTipusAnimal
 * @param {*} idTipusAnimal - L'identificador del tipus de animal a eliminar.
 */
let eliminarTipusAnimal = async (idTipusAnimal) => {
  //Missatge de confirmació abans d'eliminar el tipus d'animal.
  const confirmacio = window.confirm("Estàs segur que vols eliminar aquest tipus d'animal?");
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/tipusAnimal/${idTipusAnimal}`,{
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      //Si l'eliminació té èxit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaTipusAnimals();
        amagarFormulari();
      } else {
        alert("No s'ha pogut eliminar el tipus d'animal. Si us plau, intenta-ho més tard.");
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarTipusAnimal *****
 * Mètode GET de l'API per obtenir la informació d'un tipus animal per editar-la.
 * Fa una crida al mètode PUT actualitzarTipusAnimal per aplicar els canvis.
 * @async
 * @function editarTipusAnimal
 * @param {number} idTipusAnimal - L'identificador del tipus animal a editar.
 */
let idEditar;
let editarTipusAnimal = async (idTipusAnimal) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idTipusAnimal;
  const peticio = await fetch(`${baseUrl}/api/tipusAnimal/${idTipusAnimal}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const tipusAnimal = await peticio.json();
  document.getElementById("nomTipusAnimal").value = tipusAnimal.nomTipusAnimal;
  document.getElementById("foto").value = tipusAnimal.foto;
  document.getElementById("alt").value = tipusAnimal.alt;
};

let btnModificar = document.getElementById("btnModificar");
btnModificar.addEventListener("click", (event) => {
  event.preventDefault();
  aplicarActualitzacio(idEditar);
  console.log(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'un tipus d'animal.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idTipusAnimal - L'identificador del tipusAnimal a modificar.
 */
let aplicarActualitzacio = async (idTipusAnimal) => {
  console.log(idTipusAnimal);
  let camps = {};
  camps.idTipusAnimal = idTipusAnimal;
  camps.nomTipusAnimal = document.getElementById("nomTipusAnimal").value;
  camps.foto = document.getElementById("foto").value;
  camps.alt = document.getElementById("alt").value;

  try {
    const peticio = await fetch(`${baseUrl}/api/tipusAnimals`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camps),
    });

    if (peticio.ok) {
      llistaTipusAnimals();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar el tipus d'animal.");
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
  document.getElementById("nomTipusAnimal").value = "";
  document.getElementById("foto").value = "";
  document.getElementById("alt").value = "";
}
