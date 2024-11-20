document.addEventListener("DOMContentLoaded", () => {
    const isAdminLocal = localStorage.getItem("isAdmin");
    const isAdminSession = sessionStorage.getItem("isAdmin");

    if (isAdminLocal !== "true" && isAdminSession !== "true") {
        window.location.href = "./index.html";
    } 
});