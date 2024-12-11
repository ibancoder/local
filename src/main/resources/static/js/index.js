/*********************** URL *********************************/
const baseUrl = "http://178.156.55.174:1234"; // Per la web
//const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Esdeveniment que s'executa quan el contingut de la pàgina ha carregat.
 * Fa una petició al backend de Java Spring Boot per obtenir les últimes notícies i mostrar-les.
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", async function () {
  /**
   * @type {HTMLElement} - Element HTML on es mostraran les últimes notícies.
   */
  const ultimesNoticies = document.getElementById("ultimesNoticies");
  /**
   * @type {HTMLElement} - Element HTML on es mostraran les notícies en format carrusel.
   */
  const noticiesCarrusel = document.getElementById("noticiesCarrusel");

  //Neteja el contingut anterior, si existeix.
  ultimesNoticies.innerHTML = "";
  noticiesCarrusel.innerHTML = "";

  /**
   * Realitza una petició GET a l'API per recuperar les notícies i mostrar-les a la pàgina d'inici.
   * Si la petició és satisfactòria, mostra les tres últimes notícies.
   * @async
   * @throws {error} - Mostra un missatge d'error a la consola si la petició falla.
   */
  try {
    const peticio = await fetch(`${baseUrl}/api/noticies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    /**
     * @type {Array<Object>} - Array de notícies rebudes de l'API.
     */
    const noticias = await peticio.json();

    /**
     * Itera sobre cada notícia per formatar-la i afegir-la al DOM. Mostra les tres últimes notícies.
     * @param {Object} noticia - Objecte de notícia amb dades de títol, descripció, imatge, etc.
     * @param {number} index - Índex de la notícia en l'array, utilitzat per definir la primera notícia activa al carrusel.
     */
    const ultimasTresNoticias = noticias.slice(-3);
    ultimasTresNoticias.forEach((noticia, index) => {
      // Formatja la data de la notícia.
      const date = new Date(noticia.dataNoticia);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = date.toLocaleDateString("ca-ES", options);
      // URL completa de la imatge de la notícia.
      const imageUrl = `${baseUrl}/imatges/${noticia.foto}`;

      // Crea el contingut de l'article amb les dades de la notícia.
      const article = `
            <article class="col-lg-3"> 
                <h2>${noticia.titol}</h2><br>
                <p>${noticia.descripcio}</p>                
                <div class="imgCarrusel">                
                <img src="${imageUrl}" alt="${noticia.alt}" class="img-fluid"/>   
                </div><br>
                <a href="${noticia.urlNoticia}" class="btn">${noticia.nomBoto}</a>
                <p><em>${formattedDate}</em></p>
            </article>
        `;
      // Afegeix l'article al contenidor de notícies.
      ultimesNoticies.innerHTML += article;

      // Crea i afegeix l'element del carrusel.
      const carruselItem = `<div class="carousel-item ${index === 0 ? "active" : ""}">${article}</div>`;
      noticiesCarrusel.innerHTML += carruselItem;
    });
  } catch (error) {
    // Mostra un missatge d'error si la petició falla.
    console.error("Error en obtenir notícies:", error);
    ultimesNoticies.innerHTML =
      "<p> Error al carregar les notícies. Si us plau, intenta-ho més tard...</p>";
  }
});
