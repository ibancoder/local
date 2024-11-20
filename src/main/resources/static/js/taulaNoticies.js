/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaNoticies.
 */
window.onload = function () {
  llistaNoticies();
};

/**
 * LLista les notícies en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista de notícies i mostrar-les.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function llistaNoticies
 */
let llistaNoticies = async () => {
  const peticio = await fetch(`${baseUrl}/api/noticies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  /**
   * Array de notícies rebudes de l'API.
   * @type {Array<Object>}
   */
  const noticies = await peticio.json();

  let contingutTaula = "";
  /**
   * Itera sobre cada noticia per mostrar-la a la taula de notícies.
   */
  for (let noticia of noticies) {
    const imageUrl = noticia.foto ? `${baseUrl}/imatges/${noticia.foto}` : "";
    let contingutFila = `<tr>
    <td>${noticia.idNoticia}</td>
    <td>${noticia.dataNoticia}</td> 
    <td>${noticia.titol}</td>
    <td>${noticia.descripcio}</td>
    <td>${
      imageUrl
        ? `<img src="${imageUrl}" class="img-fluid" width="200" height="200" />`
        : ""
    }</td><td>${noticia.alt}</td>
    <td><a href="${noticia.urlNoticia}">${noticia.nomBoto}</a></td>
    <td>${noticia.activa}</td> 
    <td><i onClick="editarNoticia(${
      noticia.idNoticia
    })" class="material-icons button edit">edit</i></td>
    <td><i onClick="eliminarNoticia(${
      noticia.idNoticia
    })" class="material-icons button delete">delete</i></td>
    </tr>
    `;
    contingutTaula += contingutFila;
  }
  //Mostrem les noticies a la taula
  document.querySelector("#taula tbody").innerHTML = contingutTaula;
};

/**
 * **** EliminarNoticia *****
 * Mètode DELETE de l'API per eliminar una notícia. Un cop eliminada,
 * actualitza la llista de notícies i amaga el formulari.
 * @async
 * @function eliminarNoticia
 * @param {number} idNoticia - L'identificador de la notícia a eliminar.
 */

let eliminarNoticia = async (idNoticia) => {
  //Missatge de confirmació abans d'eliminar la notícia
  const confirmacio = window.confirm(
    "Estàs segur que vols eliminar aquesta notícia?"
  );
  if (confirmacio) {
    try {
      const peticio = await fetch(`${baseUrl}/api/noticia/${idNoticia}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      //Si l'eliminació te exit, actualitza la llista i amaga el formulari.
      if (peticio.ok) {
        llistaNoticies();
        amagarFormulari();
      } else {
        alert(
          "No s'ha pogut eliminar la notícia. Si us plau, intenta-ho més tard.");
      }
    } catch (error) {
      console.error("Error en la petició:", error);
    }
  }
};


/**
 * ***** EditarNotícia *****
 * Mètode GET de l'API per obtenir la informació d'una notícia per editar-la.
 * Fa una crida al mètode PUT aplicarActualitzacio per aplicar els canvis.
 * @async
 * @function editarNoticia
 * @param {number} idNoticia - L'identificador de la notícia a editar.
 */
let idEditar;
let editarNoticia = async (idNoticia) => {
  mostrarFormulari();
  scrollFormulari();

  idEditar = idNoticia;
  const peticio = await fetch(`${baseUrl}/api/noticia/${idNoticia}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const noticies = await peticio.json();

  document.getElementById("dataNoticia").value = noticies.dataNoticia;
  document.getElementById("titol").value = noticies.titol;
  document.getElementById("descripcio").value = noticies.descripcio;
  document.getElementById("foto").value = noticies.foto;
  document.getElementById("alt").value = noticies.alt;
  document.getElementById("urlNoticia").value = noticies.urlNoticia;
  document.getElementById("nomBoto").value = noticies.nomBoto;
  document.getElementById("activa").checked = noticies.activa;
};

/**
 * En fer click al boto modificar aplicarà les actualitzacions.
 */
let btnModificar = document.getElementById("btnModificar");
btnModificar.addEventListener("click", (evento) => {
  evento.preventDefault();
  aplicarActualitzacio(idEditar);
});

/**
 * ***** AplicarActualització *****
 * Mètode PUT de l'API per aplicar els canvis en la modificació d'una notícia.
 * Un cop actualitzada, neteja i amaga el formulari i actualitza la llista.
 * @async
 * @function aplicarActualitzacio
 * @param {number} idNoticia - L'identificador de la notícia a modificar.
 */
let aplicarActualitzacio = async (idNoticia) => {
  let camps = {};
  camps.idNoticia = idNoticia;
  camps.dataNoticia = document.getElementById("dataNoticia").value;
  camps.titol = document.getElementById("titol").value;
  camps.descripcio = document.getElementById("descripcio").value;
  camps.foto = document.getElementById("foto").value;
  camps.alt = document.getElementById("alt").value;
  camps.urlNoticia = document.getElementById("urlNoticia").value;
  camps.nomBoto = document.getElementById("nomBoto").value;
  camps.activa = document.getElementById("activa").checked;

  try {
    const peticio = await fetch(`${baseUrl}/api/noticies`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(camps),
    });

    if (peticio.ok) {
      llistaNoticies();
      netejarFormulari();
      amagarFormulari();
    } else {
      alert("Error al modificar la noticia.");
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
  document.getElementById("dataNoticia").value = "";
  document.getElementById("titol").value = "";
  document.getElementById("descripcio").value = "";
  document.getElementById("foto").value = "";
  document.getElementById("alt").value = "";
  document.getElementById("urlNoticia").value = "";
  document.getElementById("nomBoto").value = "";
  document.getElementById("activa").checked = false;
}
