/*********************** URL *********************************/
//const baseUrl = "http://178.156.55.174:1234"; // Per la web
const baseUrl = "http://localhost:1234"; // Per treballar en local

/**
 * En carregar la pàgina fem la crida a la funció llistaTipusAnimals.
 */
window.onload = function () {
  llistaAnimals();
};

/**
 * LLista dels tipus d'animals en una taula HTML, incloent els botons d'edició i eliminació.
 * Fa una petició GET a l'API per obtenir la llista dels tipus d'animals i mostrar-los.
 * @async Funció asincrònica, utilitza await dins la funció.
 * @function llistaTipusAnimals
 */
let llistaAnimals = async () => {
    const peticio = await fetch(`${baseUrl}/api/animals`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    const animals = await peticio.json();
  
    let contingutTaula = "";
    for (let animal of animals) {
      const imageUrl = animal.foto ? `${baseUrl}/imatges/${animal.foto}`: "";
      const idTipusAnimal = animal.tipusAnimals ? animal.tipusAnimals.idTipusAnimal : "No assignat";
      let contingutFila = `<tr>
      <td>${animal.idAnimal}</td>
      <td>${animal.nomAnimal}</td>
      <td>${animal.dataEntrada}</td>
      <td>${idTipusAnimal}</td>
      <td>${animal.tipusRaca}</td>
      <td>${animal.estatSalut}</td>
      <td>${animal.estatAnimal}</td>
      <td>${animal.color}</td>
      <td>${animal.edat}</td>
      <td>${animal.pes}</td>
      <td>${animal.mida}</td>
      <td>${animal.sexe}</td>
      <td>${animal.esterilitzat}</td>
      <td>${animal.vacunat}</td>
      <td>${animal.xip}</td>
      <td>${animal.comportament}</td>
      <td>${animal.necessitats}</td>      
      <td>${imageUrl ? `<img src="${imageUrl}" class="img-fluid" width="200" height="200" />`: ""}</td>
      <td>${animal.alt}</td>
      <td>${animal.observacions}</td>
      <td>${animal.rip}</td>
      <td><i onClick="editarTipusAnimal(${animal.idAnimal})" class="material-icons button edit">edit</i></td>
      <td><i onClick="eliminarTipusAnimal(${animal.idAnimal})" class="material-icons button delete">delete</i></td>
      </tr>`;
      contingutTaula += contingutFila;
    }
    //Mostrem els usuaris a la taula
    document.querySelector("#taula tbody").innerHTML = contingutTaula;
  };
  
