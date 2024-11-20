document.addEventListener("DOMContentLoaded", () => {
    const parametre = new URLSearchParams(window.location.search);
    const tipus = parametre.get("tipus");
    console.log(tipus);
    console.log(parametre);

    //Si existeix el parametre tipus afegeix el nom al titol. 
    if (tipus) {
        const titolTipusAnimal = document.getElementById("titolTipusAnimal");
        titolTipusAnimal.textContent = tipus;
        console.log(tipus);
    }
});