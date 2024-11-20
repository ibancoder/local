/**
 * Funció per tancar la sessió de l'usuari eliminant la informació 
 * emmagatzemada a localStorage i redirigint a la pàgina principal.
 * 
 * @function tancarSessio
 * @returns {void} No retorna res.
 */
export function tancarSessio() {
  const btnTancarSessio = document.getElementById("btnTancarSessio");
  if (btnTancarSessio) {
    btnTancarSessio.addEventListener("click", () => { 
      localStorage.removeItem("idUsuari");
      sessionStorage.removeItem("idUsuari");
      localStorage.removeItem("isAdmin"); // Elimina la marca de admin     ---------------AQUI
      sessionStorage.removeItem("isAdmin");
      window.location.href = "/index.html";
    });
  }
}