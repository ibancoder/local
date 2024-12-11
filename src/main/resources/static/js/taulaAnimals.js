/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaAnimals.
 * @function llistaAnimals
 */
window.onload = function () {
  llistaAnimals();
};

/**
 * LLista dels animals en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista dels animals i mostrar-los.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function llistaAnimals
 */
let llistaAnimals = async () => {
  const peticio = await fetch(`${baseUrl}/api/animals`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const animals = await peticio.json();

  let contingutTaula = "";
  for (let animal of animals) {
    const imageUrl = animal.foto ? `${baseUrl}/imatges/${animal.foto}` : "";
    const idTipusAnimal = animal.tipusAnimals ? animal.tipusAnimals.idTipusAnimal : "No assignat";
    let contingutFila = `<tr>
      <td>${animal.idAnimal}</td>
      <td>${animal.nomAnimal}</td>
      <td>${animal.dataEntrada}</td>
      <td>${idTipusAnimal}</td>      
      <td>${animal.tipusRaca}</td>
      <td>${animal.estatSalut}</td>
      <td>${animal.estatAnimal}</td>
      <td>${animal.color}</td>
      <td>${animal.edat}</td>
      <td>${animal.pes}</td>
      <td>${animal.mida}</td>
      <td>${animal.sexe}</td>
      <td>${animal.esterilitzat}</td>
      <td>${animal.vacunat}</td>
      <td>${animal.xip}</td>
      <td>${animal.comportament}</td>
      <td>${animal.necessitats}</td>      
      <td>${imageUrl ? `<img src="${imageUrl}" class="img-fluid" width="200" height="200" />`: ""}</td>
      <td>${animal.alt}</td>
      <td>${animal.observacions}</td>
      <td>${animal.apadrinat}</td>
      <td>${animal.rip}</td>
      <td><i onClick="editarAnimal(${animal.idAnimal})" class="material-icons button edit">edit</i></td>
      <td><i onClick="eliminarAnimal(${animal.idAnimal})" class="material-icons button delete">delete</i></td>
      </tr>`;
    contingutTaula += contingutFila;
  }
  //Mostrem els animals a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarAnimal *****
 * Mètode DELETE de l'API per eliminar un animal. Un cop eliminat,
 * actualitza la llista d'animals i amaga el formulari.
 * @param {*} idAnimal - L'identificador de l'animal a eliminar.
 * @function eliminarAnimal
 */
let eliminarAnimal = async (idAnimal) => { 
  //Missatge de confirmació abans d'eliminar l'animal.
  const confirmacio = window.confirm("Estàs segur que vols eliminar aquest animal?");
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/animal/${idAnimal}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació té éxit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaAnimals();
        amagarFormulari();
      } else {
        alert("No s'ha pogut eliminar l'animal. Si us plau, intenta-ho més tard.");
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarAnimal *****
 * Mètode GET de l'API per obtenir la informació d'un animal mitjançant el ID per editar-lo.
 * @async
 * @function editarAnimal
 * @param {number} idAnimal - L'identificador de l'animal a editar.
 */
let idEditar;
let editarAnimal = async (idAnimal) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idAnimal;
  const peticio = await fetch(`${baseUrl}/api/animal/${idAnimal}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const animal = await peticio.json();
  document.getElementById("nomAnimal").value = animal.nomAnimal;
  document.getElementById("dataEntrada").value = animal.dataEntrada;
  document.getElementById("idTipusAnimal").value = animal.tipusAnimals.idTipusAnimal;
  document.getElementById("estatSalut").value = animal.estatSalut;
  document.getElementById("estatAnimal").value = animal.estatAnimal;
  document.getElementById("sexe").value = animal.sexe;
  document.getElementById("tipusRaca").value = animal.tipusRaca;
  document.getElementById("color").value = animal.color;
  document.getElementById("edat").value = animal.edat;
  document.getElementById("pes").value = animal.pes;
  document.getElementById("mida").value = animal.mida;
  document.getElementById("xip").value = animal.xip;
  document.getElementById("comportament").value = animal.comportament;
  document.getElementById("necessitats").value = animal.necessitats;
  document.getElementById("foto").value = animal.foto;
  document.getElementById("alt").value = animal.alt;
  document.getElementById("observacions").value = animal.observacions;
  document.getElementById("esterilitzat").checked = animal.esterilitzat;
  document.getElementById("vacunat").checked = animal.vacunat;
  document.getElementById("apadrinat").checked = animal.apadrinat;
  document.getElementById("rip").checked = animal.rip;
};

/**
 * En fer click al botó modificar aplicarà les actualitzacions.
 */
let btnModificarAnimal = document.getElementById("btnModificarAnimal");
btnModificarAnimal.addEventListener("click", (event) => {
  event.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'un animal.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idAnimal - L'identificador de l'animal a modificar.
 */
let aplicarActualitzacio = async (idAnimal) => {
  let animal = {};
  animal.idAnimal = idAnimal;
  animal.nomAnimal = document.getElementById("nomAnimal").value;
  animal.dataEntrada = document.getElementById("dataEntrada").value;
  animal.tipusAnimals = {idTipusAnimal: parseInt(document.getElementById("idTipusAnimal").value, 10),};
  animal.estatSalut = document.getElementById("estatSalut").value;
  animal.estatAnimal = document.getElementById("estatAnimal").value;
  animal.sexe = document.getElementById("sexe").value;
  animal.tipusRaca = document.getElementById("tipusRaca").value;
  animal.color = document.getElementById("color").value;
  animal.edat = document.getElementById("edat").value;
  animal.pes = document.getElementById("pes").value;
  animal.mida = document.getElementById("mida").value;
  animal.xip = document.getElementById("xip").value;
  animal.comportament = document.getElementById("comportament").value;
  animal.necessitats = document.getElementById("necessitats").value;
  animal.foto = document.getElementById("foto").value;
  animal.alt = document.getElementById("alt").value;
  animal.observacions = document.getElementById("observacions").value;
  animal.esterilitzat = document.getElementById("esterilitzat").checked;
  animal.vacunat = document.getElementById("vacunat").checked;
  animal.apadrinat = document.getElementById("apadrinat").checked;
  animal.rip = document.getElementById("rip").checked;

  // Validació del valor de idTipusAnimal abans d'enviar la sol.licitud.
  if (
    !animal.tipusAnimals.idTipusAnimal || isNaN(animal.tipusAnimals.idTipusAnimal)) {
    alert("El tipus d'animal es incorrecte.");
    return; 
  }

  /**
   * Petició PUT a l'API.
   */
  try {
    const peticio = await fetch(`${baseUrl}/api/animals`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    });

    if (peticio.ok) {
      llistaAnimals();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar l'animal.");
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
 * Funció per netejar el formulari i deixar els camps en blanc.
 * @function netejarFormulari
 */
function netejarFormulari() {
  document.getElementById("nomAnimal").value = "";
  document.getElementById("dataEntrada").value = "";
  document.getElementById("idTipusAnimal").value = "";
  document.getElementById("estatSalut").value = "";
  document.getElementById("estatAnimal").value = "";
  document.getElementById("sexe").value = "";
  document.getElementById("tipusRaca").value = "";
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
  document.getElementById("vacunat").checked = false;
  document.getElementById("apadrinat").checked = false;
  document.getElementById("rip").checked = false;
}
