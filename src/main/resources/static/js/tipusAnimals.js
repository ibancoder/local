/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Esdeveniment que s'executa quan el contingut de la pàgina s'ha carregat.
 * Fa una petició al backend de Java Spring Boot per obrenir els tipus d'animals i mostrar-los
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", async function () {
  /**
   * Element HTML on es mostraran els tipus d'animals.
   * @type {HTMLElement}
   */
  const caixaTipusAnimals = document.getElementById("tipusAnimals");
  // Neteja el contingut anterior, si existeix.
  tipusAnimals.innerHTML = "";

  try {
    const peticio = await fetch(`${baseUrl}/api/tipusAnimals`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    /**
     * Array de tipus d'animals en resposta a la petició de l'API.
     * @type {Array<Object}
     */
    const tipusAnimals = await peticio.json();
    tipusAnimals.forEach((animal, index) => {
      const foto = `${baseUrl}/imatges/${animal.foto}`;
      //Per intercalar color de fons
      const colorFons = index % 2 === 0 ? "fondoLila" : "fondoRosa";

      const article = `
                <a href="animals.html?tipus=${animal.nomTipusAnimal}" class="tipusAnimal col-9 col-md-5 mx-auto ${colorFons}" aria-label="Anar a la secció de ${animal.nomTipus}">
                    <article>
                        <image src="${foto}" alt="${animal.alt}" class="img-fluid"/>
                        <h2 class="h2Color"><strong>${animal.nomTipusAnimal}</strong></h2>
                    </article>
                </a>
            `;
      caixaTipusAnimals.innerHTML += article;
    });
  } catch (error) {
    // Mostra un missatge d'error si la petició falla.
    console.error("Error fetching news:", error);
    caixaTipusAnimals.innerHTML = "<p> Error al carregar els tipus d'animals. Si us plau, intenta-ho més tard...</p>";
  }
});
