/**
 * @description Es dispara quan el document HTML ha estat completament carregat.
 * S'utilitza per comprovar la presència de l'ID d'usuari en el `localStorage` o `sessionStorage` 
 * i redirigir l'usuari a la pàgina d'inici si no està present.
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    const idUsuariLocal = localStorage.getItem("idUsuari");
    const idUsuariSession = sessionStorage.getItem("idUsuari");

    if (!idUsuariLocal && !idUsuariSession) {
        window.location.href = "./index.html";
    }
});