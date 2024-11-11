/** Fem petició a Java SpringBoot per que ens mostri les ultimes noticies */
document.addEventListener("DOMContentLoaded", async function () {
  const ultimesNoticies = document.getElementById("ultimesNoticies");
  const noticiesCarrusel = document.getElementById("noticiesCarrusel");

  //Netejem el contingut previament
  ultimesNoticies.innerHTML = "";
  noticiesCarrusel.innerHTML = "";


  // const baseUrl = "http://178.156.55.174:1234";   // Per la web
  const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * Petició GET de la API per veure les noticies a la pagina d'inici.
 */
  const peticio = await fetch(`${baseUrl}/api/noticies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const noticias = await peticio.json();
  const ultimasTresNoticias = noticias.slice(-3);

  ultimasTresNoticias.forEach((noticia, index) => {
    //Formatem la data
    const date = new Date(noticia.dataNoticia);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("ca-ES", options);

    // URL completa per la imatge
    const imageUrl = `http://localhost:1234/imatges/${noticia.foto}`;
    console.log("imatge url: "+imageUrl);

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
    ultimesNoticies.innerHTML += article;

    const carruselItem = `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
                ${article}
            </div>
        `;
    noticiesCarrusel.innerHTML += carruselItem;
  });
});
