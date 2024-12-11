//Servidor
import { gestionarDonacio } from 'http://178.156.55.174:8085/js/donacions.js';
import { gestionarApadrinacio } from 'http://178.156.55.174:8085/js/apadrinaments.js';
import { gestionarAdopcio } from 'http://178.156.55.174:8085/js/adopcions.js';

//En local
//import { gestionarDonacio } from "./donacions.js";
//import { gestionarApadrinacio } from './apadrinaments.js';
//import { gestionarAdopcio } from './adopcions.js';

/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * ID de l'usuari emmagatzemat en el LocalStorage del navegador.
 */
const idUsuari = localStorage.getItem("idUsuari") || sessionStorage.getItem("idUsuari");

/**
 * ID de l'animal emmagatzemada en l'url del navegador.
 */
const parametre = new URLSearchParams(window.location.search);
const idAnimal = parametre.get("id");

/**
 * Esdeveniment que s'executa quan el contingut de la pàgina s'ha carregat.
 * Fa una petició al backend de Java Spring Boot per obrenir les dades de l'animal i mostrar-les
 */
document.addEventListener("DOMContentLoaded", async function () {
    if (idAnimal) {
        await mostraDadesAnimal(idAnimal);
    } else {
        console.error("No s'ha trobat cap paràmetre 'animal' a la URL.");
    }
});

/**
 * Funció asincroma per obtenir les dades de l'animal desde l'API
 * Si la resposta és correcta, mostra les dades de l'animal a la interfície.
 * @async
 * @function mostraDadesAnimal
 */
async function mostraDadesAnimal(idAnimal) {
    try {
        const response = await fetch(`${baseUrl}/api/animal/${idAnimal}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) throw new Error(`Error ${response.status}`);
        const animal = await response.json();
        //Actualitza les dades de l'animal al DOM
        dadesAnimal(animal);
    } catch (error) {
        console.error("Error en obtenir les dades de l'animal:", error);
    }
}

/**
 * Actualitza el DOM amb les dades de l'animal.
 * @param {Object} animal - Objecte amb les dades de l'animal
 */
function dadesAnimal(animal) {
    const imatge = `${baseUrl}/imatges/${animal.foto}`;
    const foto = document.getElementById("imgAnimal")
    foto.src = imatge || "/imatges/piru.jpeg";
    foto.alt = animal.alt || "Imatge de l'animal";
    const iconoSexe = genere(animal.sexe);
    document.getElementById("nomAnimal").innerHTML = iconoSexe + animal.nomAnimal + iconoSexe;
    document.getElementById("edat").textContent = animal.edat || "Desconeguda";
    document.getElementById("sexe").textContent = animal.sexe;
    document.getElementById("tipusRaca").textContent = animal.tipusRaca || "Tipus de raça no especificada";
    document.getElementById("color").textContent = animal.color;
    document.getElementById("mida").textContent = animal.mida;
    document.getElementById("estatSalut").textContent = animal.estatSalut || "Sense informació de salut";
    document.getElementById("esterilitzat").textContent = animal.esterilitzat ? "Sí": "No";
    document.getElementById("necessitats").textContent = animal.necessitats || "Sense necessitats especials";
    document.getElementById("comportament").textContent = animal.comportament || "Sense informació de comportament";
    document.getElementById("historia").textContent = animal.observacions || "Sense història registrada";
    //Botons
    mostrarBotons(animal.estatAnimal);
}
/**
 * Genera un icona HTML segons el sexe indicat.
 *
 * @param {string} sexe - Sexe de l'animal
 * @returns {string} Un element `<i>` amb la classe que representa el sexe
 * @function genere
 */
function genere(sexe) {
    switch (sexe) {
        case "Mascle":
            return " <i class='fa-solid fa-mars'></i> ";
        case "Femella":
            return " <i class='fa-solid fa-venus'></i> ";
        default:
            return " <i class='fa-solid fa-paw'></i> ";
    }
}

/**
 * Actualitza la visibilitat dels botons segons l'estat de l'animal.
 * @param {number} estatAnimal - Estat actual de l'animal.
 * @function mostrarBotons
 */
function mostrarBotons(estatAnimal) {
    const caixaBotons = document.getElementById("botons");
    const adoptar = document.getElementById("btnAdoptar");

    if (!caixaBotons || !adoptar) return;

    //Lliure 0 - No adoptable 1
    if (estatAnimal === 1) {
        adoptar.style.display = "none";
    } else if (estatAnimal === 2 || estatAnimal === 3) {
        //Adoptat 2 - Difunt 3
        caixaBotons.style.display = "none";
    }
}

/**
 * Afegeix un event listener al botó de Apadrina'm. 
 * Quan l'usuari fa clic, inicia el procés d'apadrinació mitjançant la funció `gestionarApadrinació`.
 * @event
 */
document.getElementById("btnApadrinar").addEventListener("click", () => {
    gestionarApadrinacio(idUsuari, idAnimal, baseUrl);
});

/**
 * Afegeix un event listener al botó de donació. 
 * Quan l'usuari fa clic, inicia el procés de donació mitjançant la funció `gestionarDonacio`.
 * @event
 */
document.getElementById("btnDonar").addEventListener("click", () => {
    gestionarDonacio(idUsuari, baseUrl);
});

/**
 * Afegeix un event listener al botó de Adopta'm. 
 * Quan l'usuari fa clic, inicia el procés d'adopció mitjançant la funció `gestionarAdopcio`.
 * @event
 */
document.getElementById("btnAdoptar").addEventListener("click", () => {
    gestionarAdopcio(idUsuari, idAnimal, baseUrl);
});

