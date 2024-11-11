export function tancarSessio() {
    const btnTancarSessio = document.getElementById("btnTancarSessio");
    if (btnTancarSessio) {
      btnTancarSessio.addEventListener("click", () => {
        localStorage.removeItem("idUsuari");
        window.location.href = "/index.html";
      });
    }
};