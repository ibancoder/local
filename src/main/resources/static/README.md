# Projecte Refugi Lobita

<img src="imatges/Logopetit.jpg" alt="Logo" width="200px">

## Autors:
- Eduard Iglesies
- Iban Cervera
- Esther Pont
- Susana Garcia

## Introducció

Projecte Refugi Lobita és un projecte per un refugi d'animals on es poden veure els diferentes animals que té el refugi, i els usuaris registrats poden realitzar donacions, apadrinar animals, o adoptarlos.

## Funcionalitats
- **Noticies**: Al entrar al web, es mostraran les noticies destacades del Refugi.
- **Adoptar animals**: Els usuaris registrats, podran adoptar els animals que apareixen al web.
- **Apadrinar animals**: Els usuaris registrats, podran apadrinar a diferents animals que apareixen al web.
- **Donacions**: Els usuaris registrats podran realitzar donacions al refugi, per al manteniment dels animals.

## Tecnologies

- Frontend: Html <img src="https://github.com/user-attachments/assets/0baa9f08-5998-46cd-8ea5-e1ed3b6a4046" alt="HTML5 Icono" width="50px">, CSS <img src="https://github.com/user-attachments/assets/b16a6d61-5110-4c90-8713-cd3a592bb191" alt="CSS Icono" width="40px">,  Javascript <img src="https://github.com/user-attachments/assets/0006404f-4a0c-409f-958d-472dc133994e" alt="JS Icono" width="40px">

- Backend: Spring Boot <img src="https://github.com/user-attachments/assets/92a653b9-fb22-432c-8de8-1fd8399b583b" alt="Spring Boot Icono" width="40px">

- Database: MySQL <img src="https://github.com/user-attachments/assets/f9e7a966-9fc3-40af-a16c-bb7ca5fd1d6e" alt="MySQL Icono" width="40px">

## Arquitectura

Aquest projecte fa servir una arquitectura del tipus RESTful API (Respresentational State Transfer), un estil d'arquitectura àmpliament utilitzat per a sistemes distribuïts que interactuen a través de la web.
Aquesta arquitectura es basa en l'us de recursos identificats mitjançant URLs i en la transferencia de representacions d'aquests recursos a través del protocol HTTP.

Les funcions bàsiques d'una API RESTful es basen en els mètodes estàndar d'HTTP, que permeten realitzar operacions sobre els recursos disponibles. Aquestes funciones inclouen:
1. **GET**: Recuperar informació d'un recurs específic. Per exemple, obtenir la llista d'animals, o d'un animal en concret.
2. **POST**: Crear un nou recurs. Per exemple, afegir un nou animal al sistema.
3. **PUT**: Actualitzar un recurs existent. Per exemple, modificar els detalls d'un animal creat previament.
4. **DELETE**: Eliminar un recurs especific. Per exemple, esborrar un animal del sistema.
5. **PATCH**: Actualitzar parcialment un recurs, utilitzat per a canvis específics sense modificar tot el recurs.

En seguir els principis REST, aquesta arquitectura ofereix característiques clau com ara:
- **Escalabilitat**: Els clients i els servidors estan desacoblats, cosa que facilita el creixement del sistema.
- **Simplicitat**: L'ús d'estàndards com HTTP i JSON permet una integració i comprensió senzilles.
- **Portabilitat**: Els recursos són fàcilment accessibles des de diferents plataformes i dispositius.

---
La estructura del projecte es la següent:
- **Frontend**: https://github.com/susangn50/ProjecteRefugiLobita
  Aqui trobarem el html,css i javascript.
- **Backend**: https://github.com/susangn50/ProjecteRefugiLobitaJavaSpring
  Aquí trobarem l'aplicació Spring Boot.




  
