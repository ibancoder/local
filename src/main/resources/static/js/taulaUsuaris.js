/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaUsuaris.
 * @function llistaUsuaris
 */
window.onload = function () {
  llistaUsuaris();
};

/**
 * LLista els usuaris en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista d'usuaris i mostrar-los.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function llistaUsuaris
 */
let llistaUsuaris = async () => {
  const peticio = await fetch(`${baseUrl}/api/usuaris`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  /**
   * Array d'usuaris rebuts de l'API.
   * @type {Array<Object>}
   */
  const usuaris = await peticio.json();

  let contingutTaula = "";
  /**
   * Itera sobre cada usuari per mostrar-ho a la taula d'usuaris.
   */
  for (let usuari of usuaris) {    
    let contingutFila = `<tr>
      <td>${usuari.idUsuari}</td>      
      <td>${usuari.nom}</td>
      <td>${usuari.cognoms}</td>      
      <td>${usuari.email}</td>      
      <td>${usuari.telefon}</td>        
      <td>${usuari.nomUsuari}</td>                 
      <td>${usuari.dataAlta}</td>  
      <td>${usuari.actiu}</td>      
      <td><i onClick="editarUsuari(${usuari.idUsuari})" class="material-icons button edit">edit</i></td>
      <td><i onClick="eliminarUsuari(${usuari.idUsuari})" class="material-icons button delete">delete</i></td>      
      </tr>
      `;
    contingutTaula += contingutFila;
  }
  //Mostrem els usuaris a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarUsuari *****
 * Mètode DELETE de la API, per eliminar l'usuari en clicar el botó eliminarUsuari
 * Un cop eliminat tornem a llistar els usuaris i amaguem el formulari.
 * L'usuari LobitaAdmin no es pot eliminar.
 * @param {number} idUsuari - Selecciona el id de l'usuari a eliminar.
 * @function eliminarUsuari
 */

let eliminarUsuari = async (idUsuari) => {
  //No es pot eliminar el usuari admin
  if (idUsuari === 1 ) {
    alert("Ho sento, no es pot eliminar l'usuari LobitaAdmin. Gràcies.");
    return;
  }
  //Missatge de confirmació abans d'eliminar l'usuari
  const confirmacio = window.confirm("Estàs segur que vols eliminar l'usuari "+idUsuari+ "?");
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/usuari/${idUsuari}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació te exit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaUsuaris();
        amagarFormulari();
      } else {
        alert("No s'ha pogut eliminar l'usuari'. Si us plau, intenta-ho més tard." );
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};

/**
 * ***** EditarUsuari *****
 * Mètode GET de la API per editar l'usuari. Un cop cliquem al botó Modificar ens mostra l'usuari
 * mitjançant el ID i fa la crida al mètode PUT aplicarActualització.
 * @param {*} idUsuari selecciona el id de l'usuari a editar.
 * @function editarUsuari
 */
let idEditar;
let editarUsuari = async (idUsuari) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idUsuari;
  const peticio = await fetch(`${baseUrl}/api/usuari/${idUsuari}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const usuaris = await peticio.json();

  document.getElementById("nom").value = usuaris.nom;
  document.getElementById("cognoms").value = usuaris.cognoms;
  document.getElementById("email").value = usuaris.email;
  document.getElementById("telefon").value = usuaris.telefon;
  document.getElementById("nomUsuari").value = usuaris.nomUsuari;
  document.getElementById("password").value = usuaris.password;
  document.getElementById("actiu").checked = usuaris.actiu;
};

/**
 * Botó per modificar el usuari.
 */
let btnModificarUsuari = document.getElementById("btnModificarUsuari");

btnModificarUsuari.addEventListener("click", (evento) => {
  evento.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de la API per aplicar la modificació feta. Si es fa la modificació
 * tornarà a llistar les noticies, netejara el formulari i amagara el formulari.
 * @param {*} id Selecciona el id a aplicar la actualització.
 * @function aplicarActualitzacio
 */
let aplicarActualitzacio = async (idUsuari) => {
  let camps = {};
  camps.idUsuari = idUsuari;
  camps.nom = document.getElementById("nom").value;
  camps.cognoms = document.getElementById("cognoms").value;
  camps.email = document.getElementById("email").value;
  camps.telefon = document.getElementById("telefon").value;
  camps.nomUsuari = document.getElementById("nomUsuari").value;
  camps.password = document.getElementById("password").value;
  camps.actiu = document.getElementById("actiu").checked;

  try {
    const peticio = await fetch(`${baseUrl}/api/usuaris`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camps),
    });

    if (peticio.ok) {
      llistaUsuaris();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar el usuari.");
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
 * Funció per netejar el formulari deixant els camps en blanc.
 * @function netejarFormulari
 */
function netejarFormulari() {
  document.getElementById("nom").value = "";
  document.getElementById("cognoms").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefon").value = "";
  document.getElementById("nomUsuari").value = "";
  document.getElementById("password").value = "";
  document.getElementById("actiu").checked = false;
}
