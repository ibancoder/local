/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Quan el DOM està carregat, gestiona el paràmetre "tipus" de la URL.
 * Si es troba, s'actualitza el títol i es mostren els tipus d'animals corresponents.
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", function () {
  const parametre = new URLSearchParams(window.location.search);
  const tipus = parametre.get("tipus");

  //Si existeix el paràmetre tipus, afegeix el tipusNom al títol i mostra els animals.
  if (tipus) {
    const titolElement = document.getElementById("titolTipusAnimal");
    titolElement.textContent = tipus;
    mostrarAnimal(tipus);

    //Posa una icona o altre depen del tipus
    const iconas = document.querySelectorAll(".icona");
    iconas.forEach((icona) => {
      switch (tipus) {
        case "Gossos":
          icona.innerHTML = '<i class="fa-solid fa-bone"></i>';
          break;
        case "Gats":
          icona.innerHTML = '<i class="fa-solid fa-cat"></i>';
          break;
        case "Ocells":
          icona.innerHTML = '<i class="fa-solid fa-feather"></i>';
          break;
        default:
          icona.innerHTML = '<i class="fa-solid fa-heart"></i>';
      }
    });
  }
});

/**
 * Contenidor per mostrar els animals.
 */
const caixaAnimals = document.getElementById("animals");

/**
 * Mostra els animals en funció del tipus especificat i l'estat.
 * @async
 * @function mostrarAnimal
 * @param {string} tipusNom - El tipus d'animal a mostrar
 * @returns {Promise<void>} Retorna una promesa que mostra els animals o un missatge d'error.
 */
async function mostrarAnimal(tipusNom) {
  try {
    // Petició a l'API per obtenir els animals.
    const peticio = await fetch(`${baseUrl}/api/animals`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!peticio.ok) {
      throw new Error(`Error en la petició: ${peticio.status}`);
    }

    //Resposta amb les dades rebudes de la API.
    const animals = await peticio.json();

    // Filtrar només els animals que coincideixen amb el tipus seleccionat.
    const animalsFiltrats = tipusNom
      ? animals.filter(
          (animal) =>
            animal.tipusAnimals &&
            // Comparació pel nom del tipus
            animal.tipusAnimals.nomTipusAnimal === tipusNom &&
            //Filtrar per l'estat de l'animal
            (animal.estatAnimal === 0 || animal.estatAnimal === 1)
        )
      : animals;

    if (animalsFiltrats.length === 0) {
      caixaAnimals.innerHTML = "<p>No hi ha animals per mostrar.</p>";
      return;
    }

    //Ens asegurem que el contenidor està buit.
    caixaAnimals.innerHTML = "";

    /**
     * Recorregut per totes les dades dels animals filtrats per tipusNom i estat
     */
    animalsFiltrats.forEach((animal) => {

      //Si es mascle o femella afegeix classes, icona, botons.
      let mascleFemella = {};
      if (animal.sexe == "Mascle") {
        mascleFemella = {
          clases: "fondoLila lila animalsLila",
          icona: '<i class="fa-solid fa-mars"></i>',
          boto: "aBtn",
        };
      } else if (animal.sexe == "Femella") {
        mascleFemella = {
          clases: "fondoRosa rosa animalsRosa",
          icona: '<i class="fa-solid fa-venus"></i>',
          boto: "",
        };
      }

      // Foto url
      const foto = `${baseUrl}/imatges/${animal.foto}`;

      // Contenidor d'animals.
      const article = `
      <article class="${mascleFemella.clases}">                 
        <h3>${animal.nomAnimal} ${mascleFemella.icona}</h3>  
        <img src="${foto}" alt="${animal.alt}"/> 
        <a href="perfilAnimal.html?id=${animal.idAnimal}" class="btn ${mascleFemella.boto}">Veure perfil</a>
      </article>
        `;
      // Afegeix les dades al contenidor dels animals.
      caixaAnimals.innerHTML += article;
    });
  } catch (error) {
    // Mostra un missatge d'error si la petició falla.
    console.error("Error fetching news:", error);
    caixaAnimals.innerHTML =
      "<p> Error al carregar els animals. Si us plau, intenta-ho més tard...</p>";
  }
}
