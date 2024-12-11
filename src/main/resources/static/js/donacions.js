/**
 * Gestiona el procés de donació d'un usuari.
 * Comprova si l'usuari està loguejat, sol·licita una quantitat mitjançant un prompt i envia una petició al backend per registrar la donació.
 *
 * @async
 * @function gestionarDonacio
 * @param {number} idUsuari - L'identificador únic de l'usuari que fa la donació.
 * @param {string} baseUrl - La URL base de l'API backend.
 * @throws {Error} Llença un error si no es pot completar la petició al backend.
 */
export async function gestionarDonacio(idUsuari, baseUrl) {
  // Comprovar si l'usuari esta logejat
  if (!idUsuari) {
    alert("Si us plau, inicia sessió.");
    return;
  }
  // Data actual, elimina la part de zona horaria i temps.
  const dataDonacio = new Date().toISOString().split("T")[0]; 

  // Mostra el prompt per introduir la quantitat
  const quantitat = prompt("Introdueix la donació:");
  if (quantitat === null) {
    alert("Donació cancel·lada.");
    return;
  }
  if (!quantitat || isNaN(quantitat) || quantitat <= 0) {
    alert("Has d'introduir una quantitat vàlida.");
    return;
  }

  // Objecte per enviar
  const donacio = {
    idUsuari: parseInt(idUsuari),
    quantitat: parseFloat(quantitat),
    dataDonacio: dataDonacio,
  };

  try {
    // Petició al backend
    const queryParams = new URLSearchParams(donacio).toString();
    const peticio = await fetch(`${baseUrl}/api/donacions?${queryParams}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (!peticio.ok) {
      throw new Error(
        `Error ${peticio.status}: No s'ha pogut completar la donació.`
      );
    }
    alert("Donació correcte!");
  } catch (error) {
    console.error("Error durant la donació:", error);
  }
}

/**
 * Mostra les donacions fetes.
 * @async
 * @function mostrarDonacions
 * @param {number} idUsuari - ID del usuari que fa la donació.
 * @param {URL} baseUrl - URL base 
 * @param {*} caixaDonacions - on es mostraran les donacions.
 */
export async function mostrarDonacions(idUsuari, baseUrl, caixaDonacions) {
  try {
    const peticio = await fetch(`${baseUrl}/api/donacions`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!peticio.ok) {
      throw new Error(
        `Error ${peticio.status}: No s'ha pogut obtenir les donacions.`
      );
    }

    const donacions = await peticio.json();   
    //Neteja el contingut anterior
    caixaDonacions.innerHTML = "";
    let donacioTotal = 0;
    for (let donacio of donacions) {
      if (idUsuari == donacio.usuaris.idUsuari) {
        donacioTotal = donacioTotal + donacio.quantitat;
        caixaDonacions.innerHTML = `
                <p><i class="fa-solid fa-check"></i> Has donat un total de <b>${donacioTotal} €</b>.</p>
                <p><i class="fa-solid fa-plus"></i> Pots fer una altra donació aquí &nbsp; <i class="fa-solid fa-arrow-right"></i> &nbsp; <a id="btnDonar">Donar</a></p>
            `;
      } else {
        caixaDonacions.innerHTML = `
                <p><i class="fa-solid fa-minus"></i> Encara no hi ha cap donació.</p>
                <p><i class="fa-solid fa-minus"></i> Pots fer la teva primera donació aquí &nbsp; <i class="fa-solid fa-arrow-right"></i> &nbsp; <a id="btnDonar">Donar</a></p>
            `;
      }
    }
  } catch (error) {
    console.error("Error en mostrar les donacions: ", error);
    alert("Hi ha hagut un error al carregar les donacions.");
  }
}
