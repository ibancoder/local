  let boto = document.getElementById("btnRegistre");

  boto.addEventListener("click", (event) => {
    event.preventDefault();
    registrarTipusUsuari();
  });

  /**
  * Funcio per registrar tipus d'usuaris
  */

  let registrarTipusUsuari = async () => {
    let idtipususuari = document.getElementById("idtipususuari").value.trim();
    let descripcio = document.getElementById("descripcio").value.trim();

    if(!idtipususuari || !descripcio){
    alert("Es necessari omplir els 2 camps!!")
    return;
    }

    let formData = new FormData();
    formData.append("idtipususuari", idtipususuari);
    formData.append("descripcio", descripcio);

    try {
    const peticio = await fetch("http://127.0.0.1:8080/api/crearTipusUsuari", {
    method:"POST",
    body: formData,
    });
    if (!peticio.ok){
    throw new Error ( "Error ${peticio.status}: No s'ha pogut registrar el tipus d'usuari")};
    }
    const resposta = await.peticio.json();
    alert ("Hi ha hagut un error al registrar el tipus d'usuari.");
  }

  function netejarFormulari(){
  document.getElementById("idtipususuari").value = "";
  document.getElementById("descripcio").value = "";

  }
};
