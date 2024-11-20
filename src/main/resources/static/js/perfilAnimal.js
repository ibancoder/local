/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Esdeveniment que s'executa quan el contingut de la pàgina s'ha carregat.
 * Fa una petició al backend de Java Spring Boot per obrenir les dades de l'animal i mostrar-les
 */
document.addEventListener("DOMContentLoaded", async function () {
    const parametre = new URLSearchParams(window.location.search);
    const idAnimal = parametre.get("animal");

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
        const response = await fetch(`${baseUrl}/api/animals/${idAnimal}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const animal = await response.json();
        //Mostrem les dades de l'usuari.
        dadesAnimal(animal);
    } catch (error) {
        console.error("Error en obtenir les dades de l'animal:", error);
        alert("Error en carregar les dades de l'animal. Torna a intentar-ho més tard.");
    }
}

/**
 * Actualitza el DOM amb les dades de l'animal.
 * @param {Object} animal - Objecte amb les dades de l'animal
 */
function dadesAnimal(animal) {
    const foto = document.getElementById("imgAnimal")
    foto.src = animal.foto || "/imatges/piru.jpeg";
    foto.alt = animal.alt || "Imatge de l'animal";
    document.getElementById("nomAnimal").textContent = animal.nomAnimal;
    document.getElementById("edat").textContent = animal.edat || "Edat desconeguda";
    document.getElementById("tipusRaca").textContent = animal.tipusRaca || "Tipus de raça no especificada";
    document.getElementById("color").textContent = animal.color;
    document.getElementById("mida").textContent = animal.mida;
    document.getElementById("estatSalut").textContent = animal.estatSalut || "Sense informació de salut";
    document.getElementById("esterilitzat").textContent = animal.esterilitzat;
    document.getElementById("necessitats").textContent = animal.necessitats || "Sense necessitats especials";
    document.getElementById("comportament").textContent = animal.comportament || "Sense informació de comportament";
    document.getElementById("historia").textContent = animal.observacions || "Sense història registrada";
}