/**
 * Funció per tancar la sessió de l'usuari eliminant la informació
 * emmagatzemada a localStorage i SessionStorage i redirigint a la pàgina principal.
 *
 * @function tancarSessio
 * @returns {void} No retorna cap valor.
 * @throws {Error} Si 'LocalStorage' o 'SessionStorage' no són accessibles.
 *
 * @description Aquesta funció assumeix que existeix un element amb l'ID 'btnTancarSessio' al DOM.
 * En cas contrari, no farà res i mostrara un missatge al registre.
 */
export function tancarSessio() {
  const btnTancarSessio = document.getElementById("btnTancarSessio");
  if (!btnTancarSessio) {
    console.warn("El botó 'btnTancarSessio' no s'ha trobat al DOM.");
    return;
  }
  btnTancarSessio.addEventListener("click", () => {
    try {
      // Eliminar dades de la sessió.
      localStorage.removeItem("idUsuari");
      sessionStorage.removeItem("idUsuari");
      localStorage.removeItem("isAdmin");
      sessionStorage.removeItem("isAdmin");

      // Redirigir a la pàgina principal.
      window.location.href = "/index.html";
    } catch (error) {
      console.error("Error al tancar la sessió: ", error);
      alert("No s'ha pogut tancar la sessió. Si us plau, intenta-ho més tard.");
    }
  });
}
