/*********************** URL *********************************/
// const baseUrl = "http://178.156.55.174:1234";   // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local


document.getElementById("btnTancarSessio")
.addEventListener("click", function () {
  // Netegem localStorage
  localStorage.removeItem("idUsuari");
  // Redirigim a index.html
  window.location.href = "/index.html";
});



