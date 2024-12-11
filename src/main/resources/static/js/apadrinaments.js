/**
 * Gestiona el procés d'apadrinament d'un animal.
 * Comprova si l'usuari està loguejat, sol·licita una quantitat mitjançant un prompt i envia una petició al backend per registrar l'apadrinament.
 *
 * @async
 * @function gestionarApadrinacio
 * @param {number} idUsuari - L'identificador únic de l'usuari que fa l'apadrinació'.
 * @param {number} idAnimal - L'identificador únic de l'animal que és apadrinat. 
 * @param {string} baseUrl - La URL base de l'API backend.
 * @throws {Error} Llença un error si no es pot completar la petició al backend.
 */
export async function gestionarApadrinacio(idUsuari, idAnimal, baseUrl) {
    // Comprovar si l'usuari esta logejat
    if (!idUsuari) {
        alert("Si us plau, inicia sessió.");
        return;
    }

    // Data actual,elimina la part de zona horaria i temps.
    const dataAlta = new Date().toISOString().split("T")[0]; 

    // Mostra el prompt per introduir la quantitat
    const quotaMensual = prompt("Introdueix la quota per apadrinar:");
    if (quotaMensual === null) {
        alert("Apadrinació cancel·lada.");
        return;
    }
    if (!quotaMensual || isNaN(quotaMensual) || quotaMensual <= 0) {
        alert("Has d'introduir una quantitat vàlida.");
        return;
    }

    // Objecte per enviar
    const apadrinament = {
        idUsuari: parseInt(idUsuari),
        idAnimal: parseInt(idAnimal),
        quotaMensual: parseFloat(quotaMensual),
        dataAlta: dataAlta
    };    

    try {
        // Petició al backend
        const queryParams = new URLSearchParams(apadrinament).toString();
        const peticio = await fetch(`${baseUrl}/api/apadrinats?${queryParams}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });

        if (!peticio.ok) {
            throw new Error(`Error ${peticio.status}: No s'ha pogut completar l'apadrinament.`);
        }

        canviarApadrinat(idAnimal, baseUrl);
        alert("Apadrinament completat correctament!");

    } catch (error) {
        console.error("Error durant l'apadrinament:", error);
    }
}

/**
 * Mostra els apadrinaments d'un usuari específic a la interfície.
 * Obté les dades d'apadrinament des del backend, filtra per usuari
 * i genera el contingut HTML per mostrar els resultats.
 *
 * @async
 * @function
 * @param {number} idUsuari - Identificador únic de l'usuari actual.
 * @param {string} baseUrl - URL base per fer les sol·licituds a l'API.
 * @param {HTMLElement} caixaApadrinats - Element del DOM on es mostrarà la informació dels apadrinaments.
 * @throws {Error} Llança un error si hi ha problemes en la sol·licitud o el processament de dades.
 */
export async function mostrarApadrinats(idUsuari, baseUrl, caixaApadrinats) {
    try {
        const peticio = await fetch(`${baseUrl}/api/apadrinats`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        if (!peticio.ok) {
            throw new Error(
                `Error ${peticio.status}: No s'ha pogut obtenir els apadrinats.`
            );
        }

        const apadrinats = await peticio.json();       

        //Variable per acumular
        let htmlApadrinats = "";

        for (let apadrinat of apadrinats) {
            if (idUsuari == apadrinat.usuaris.idUsuari) {
                htmlApadrinats += `
                    <article class="text-center fondoRosa animalsUsuari">
                        <h5>${apadrinat.animals.nomAnimal}</h5>
                        <img class="img-fluid" src="${baseUrl}/imatges/${apadrinat.animals.foto}" alt="${apadrinat.animals.alt}">
                        <p>Aportació mensual: ${apadrinat.quotaMensual}€</p>
                    </article>
                `;
            }
        }

        if (htmlApadrinats !== "") {
            htmlApadrinats += `
                <p><i class="fa-solid fa-plus"></i> Pots apadrinar un altre animal aquí &nbsp; 
                <i class="fa-solid fa-arrow-right"></i> &nbsp; <a href="../tipusAnimals.html" onclick="event.stopPropagation();">Apadrinar</a></p>
            `;
        } else {
            htmlApadrinats = `
                    <p><i class="fa-solid fa-minus"></i> Encara no hi ha cap animal apadrinat.</p>
                    <p><i class="fa-solid fa-minus"></i> Pots fer la teva primera apadrinació aquí &nbsp; 
                    <i class="fa-solid fa-arrow-right"></i> &nbsp; <a href="../tipusAnimals.html" onclick="event.stopPropagation();">Apadrinar</a></p>
                `;
        }
        //Assignar el contingut acumulat
        caixaApadrinats.innerHTML = htmlApadrinats;

    } catch (error) {
        console.error("Error en mostrar els apadrinats: ", error);
        alert("Hi ha hagut un error al carregar els apadrinats.");
    }
}

/**
 * Actualitza l'apadrinament d'un animal en la base de dades.
 * 
 * Aquesta funció fa una petició GET per obtenir les dades d'un animal utilitzant el seu ID, després actualitza només el camp `apadrinat` 
 * a true, i finalment fa una petició PUT per actualitzar l'animal a la base de dades.
 * 
 * @async
 * @function canviarApadrinat
 * @param {number} idAnimal - L'ID de l'animal que es vol actualitzar.
 * @param {string} baseUrl - La URL base del servidor on s'executa l'API.
 * @throws {Error} Llença un error si no es pot obtenir o actualitzar l'animal.
 */
async function canviarApadrinat(idAnimal, baseUrl) {
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
        animal.apadrinat = true;

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

        alert("Apadrinament de l'animal s'ha actualitzat correctament!");

    } catch (error) {
        console.error("Error en la sol·licitud:", error);
        alert("Error de connexió o en el servidor.");
    }
}