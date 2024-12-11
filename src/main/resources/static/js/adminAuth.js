/**
 * @description Redirigeix l'usuari a la pàgina d'inici si no és administrador.
 * Aquesta funció verifica si l'usuari té privilegis d'administrador
 * mitjançant la clau "isAdmin" emmagatzemada a `localStorage` o `sessionStorage`.
 * Si cap d'elles té el valor `"true"`, l'usuari és redirigit a "index.html". 
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  const isAdminLocal = localStorage.getItem("isAdmin");
  const isAdminSession = sessionStorage.getItem("isAdmin");

  if (isAdminLocal !== "true" && isAdminSession !== "true") {
    window.location.href = "./index.html";
  }
});
