/**
 * Gestiona el procés d'adopció d'un animal.
 * Comprova si l'usuari està loguejat, sol·licita una confirmació i envia una petició al backend per registrar l'adopció.
 *
 * @async
 * @function gestionarAdopcio
 * @param {number} idUsuari - L'identificador únic de l'usuari que fa l'adopció'.
 * @param {number} idAnimal - L'identificador únic de l'animal que és adoptat. 
 * @param {string} baseUrl - La URL base de l'API backend.
 * @throws {Error} Llença un error si no es pot completar la petició al backend.
 */
export async function gestionarAdopcio(idUsuari, idAnimal, baseUrl) {
    // Comprovar si l'usuari esta logejat
    if (!idUsuari) {
        alert("Si us plau, inicia sessió.");
        return;
    }

    // Data actual, elimina la part de zona horaria i temps.
    const dataAlta = new Date().toISOString().split("T")[0]; 

    // Objecte per enviar
    const adopcio = {
        idUsuari: parseInt(idUsuari),
        idAnimal: parseInt(idAnimal),
        dataAlta: dataAlta
    };    

    try {
        // Mostrar un missatge de confirmació
        const confirmacio = confirm(`Estàs segur que vols adoptar l'animal?`);
        // Si l'usuari cancela, sortira de la funció
        if (!confirmacio) {
            alert("L'adopció s'ha cancel·lat.");
            return;
        }

        // Petició al backend
        const queryParams = new URLSearchParams(adopcio).toString();
        const peticio = await fetch(`${baseUrl}/api/adoptats?${queryParams}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });

        if (!peticio.ok) {
            throw new Error(`Error ${peticio.status}: No s'ha pogut completar l'adopcio.`);
        }

        canviarEstatAnimal(idAnimal, baseUrl);
        alert("Adopcio completada correctament!");
    } catch (error) {
        console.error("Error durant l'apadrinament:", error);
    }
}

/**
 * Mostra les adopcions d'un usuari específic a la interfície.
 * Obté les dades d'adopcions des del backend, filtra per usuari
 * i genera el contingut HTML per mostrar els resultats.
 *
 * @async
 * @function mostrarAdoptats
 * @param {number} idUsuari - Identificador únic de l'usuari actual.
 * @param {string} baseUrl - URL base per fer les sol·licituds a l'API.
 * @param {HTMLElement} caixaAdoptats - Element HTML del DOM on es mostrarà la informació de les adopcions.
 * @throws {Error} Llança un error si hi ha problemes en la sol·licitud o el processament de dades.
 */
export async function mostrarAdoptats(idUsuari, baseUrl, caixaAdoptats) {
    try {
        const peticio = await fetch(`${baseUrl}/api/adoptats`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!peticio.ok) {
            throw new Error(
                `Error ${peticio.status}: No s'ha pogut obtenir els adoptats.`
            );
        }

        // Resposta de la API
        const adoptats = await peticio.json();    

        //Variable per acumular
        let htmlAdoptats = "";

        for (let adoptat of adoptats) {
            if (idUsuari == adoptat.usuaris.idUsuari) {
                htmlAdoptats += `
                    <article class="text-center fondoLila animalsUsuari">
                        <h5>${adoptat.animals.nomAnimal}</h5>
                        <img class="img-fluid" src="${baseUrl}/imatges/${adoptat.animals.foto}" alt="${adoptat.animals.alt}">
                        <p>Des de: ${adoptat.dataAlta}</p>
                    </article>
                `;
            }
        }

        if (htmlAdoptats !== "") {
            htmlAdoptats += `
                <p><i class="fa-solid fa-plus"></i> Pots adoptar un altre animal aquí &nbsp; 
                <i class="fa-solid fa-arrow-right"></i> &nbsp; <a href="../tipusAnimals.html" onclick="event.stopPropagation();">Adoptar</a></p>
            `;
        } else {
            htmlAdoptats = `
                    <p><i class="fa-solid fa-minus"></i> Encara no hi ha cap animal adoptat.</p>
                    <p><i class="fa-solid fa-minus"></i> Pots fer la teva primera adopció aquí &nbsp; 
                    <i class="fa-solid fa-arrow-right"></i> &nbsp; <a href="../tipusAnimals.html" onclick="event.stopPropagation();">Adoptar</a></p>
                `;
        }
        //Assignar el contingut acumulat
        caixaAdoptats.innerHTML = htmlAdoptats;

    } catch (error) {
        console.error("Error en mostrar els adoptats: ", error);
        alert("Hi ha hagut un error al carregar els adoptats.");
    }
}

/**
 * Actualitza l'estat d'un animal al backend.
 * @async
 * @function canviarEstatAnimal
 * @param {number} idAnimal - Identificador únic de l'animal.
 * @param {URL} baseUrl - URL base per fer sol·licituds a l'API.
 * @throws {Error} Llança un error si hi ha problemes amb la sol·licitud.
 */
async function canviarEstatAnimal(idAnimal, baseUrl) {
    try {
        // Obtenir l'animal complet
        const resposta = await fetch(`${baseUrl}/api/animal/${idAnimal}`, {
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
        animal.estatAnimal = 2;

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