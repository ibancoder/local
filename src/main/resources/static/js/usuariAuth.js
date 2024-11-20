document.addEventListener("DOMContentLoaded", () => {
    const idUsuariLocal = localStorage.getItem("idUsuari");
    const idUsuariSession = sessionStorage.getItem("idUsuari");

    if (!idUsuariLocal && !idUsuariSession) {
        window.location.href = "./index.html";
    }
});