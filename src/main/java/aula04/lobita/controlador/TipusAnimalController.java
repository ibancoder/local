package aula04.lobita.controlador;

import aula04.lobita.models.TipusAnimal;
import aula04.lobita.repositori.TipusAnimalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Optional;

@RestController
public class TipusAnimalController {

    TipusAnimalRepository tipusAnimalRepository;
    Logger logger = LoggerFactory.getLogger(TipusAnimalController.class);

    public TipusAnimalController(TipusAnimalRepository tipusAnimalRepository){
        this.tipusAnimalRepository = tipusAnimalRepository;
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500", "http://localhost:8080"})
    @PostMapping("/api/creartipusanimal")
    public void crearTipusAnimal(){

        TipusAnimal tipusanimal1 = new TipusAnimal(1,"Gossos","img/gos.jpg","foto de gossos");
        TipusAnimal tipusanimal2 = new TipusAnimal(2,"Gats", "img/gat.jpg", "foto de gats");
        TipusAnimal tipusanimal3 = new TipusAnimal(3,"Ocells", "img/Ocells.jpg", "foto de ocells");
        TipusAnimal tipusanimal4 = new TipusAnimal(4,"Altres", "img/altres.jpg","foto d'altres");

        tipusAnimalRepository.save(tipusanimal1);
        tipusAnimalRepository.save(tipusanimal2);
        tipusAnimalRepository.save(tipusanimal3);
        tipusAnimalRepository.save(tipusanimal4);
    }


    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/tipusAnimal/{idTipusAnimal}")
    public ResponseEntity<TipusAnimal> getTipusAnimal(@PathVariable Integer idTipusAnimal) {
        Optional<TipusAnimal> opt = tipusAnimalRepository.findById(idTipusAnimal);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(opt.get());
        }
    }


    /**
     * Mètode que respon a una petició POST per guardar el tipus d'animal.
     * @param nomTipusAnimal Nom del tipus d'animal.
     * @param foto Fitxer de la imatge.
     * @param alt Text alternatiu a la imatge.
     * @return Retorn el tipus d'animal creat o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/tipusAnimals")
    public ResponseEntity<TipusAnimal> guardarTipusAnimal(
            @RequestParam("nomTipusAnimal") String nomTipusAnimal,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("alt") String alt){

        //Foto
        if (foto.isEmpty()){
            return ResponseEntity.badRequest().body(new TipusAnimal());
        }
        logger.info("Nom imatge: " + foto.getOriginalFilename());
        logger.info("Alt imatge: " + alt);
        logger.info("Mida imatge: " + foto.getSize() + " bytes");

        //Ruta per guardar imatges en el servidor.
        //String ruta = "/tmp/";
        //Ruta per guardar imatges en proves en local.
        String ruta = "E:/Cursos Udemy/Universidad_Java/Practicas/lobita/src/main/resources/static/imatges";

        try {
            Path rutaCompleta = Paths.get(ruta, foto.getOriginalFilename());
            Files.write(rutaCompleta, foto.getBytes());
        } catch (IOException e) {
            logger.error("Error en guardar la imatge a la ruta: " + ruta + foto.getOriginalFilename());
            logger.error("Missatge d'error: {}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        //Guardem els tipus d'Animals en la BBDD
        TipusAnimal tipusAnimals = new TipusAnimal(nomTipusAnimal, foto.getOriginalFilename(), alt);
        tipusAnimalRepository.save(tipusAnimals);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipusAnimals);
    }


    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre un tipus d'animal existent.
     * @param tipusAnimal Objecte tipusAnimal amb les dades actualitzades.
     * @return Retorna el tipus d'animal actualitzat o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/tipusAnimals")
    public ResponseEntity<TipusAnimal> actualitzarTipusAnimal(@RequestBody TipusAnimal tipusAnimal) {
        if (tipusAnimal.getIdTipusAnimal() == null || !tipusAnimalRepository.existsById(tipusAnimal.getIdTipusAnimal())) {
            return ResponseEntity.badRequest().build();
        }
        tipusAnimalRepository.save(tipusAnimal);
        return ResponseEntity.ok(tipusAnimal);
    }

    /**
     * Mètode que utilitza una operació delete per eliminar un tipus d'animal de la base de dades.
     * @param idTipusAnimal ID del tipus d'animal a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/tipusAnimal/{idTipusAnimal}")
    public ResponseEntity<TipusAnimal> deleteTipusAnimal(@PathVariable Integer idTipusAnimal) {
        if (idTipusAnimal == null || !tipusAnimalRepository.existsById(idTipusAnimal)) {
            return ResponseEntity.badRequest().build();
        }
        tipusAnimalRepository.deleteById(idTipusAnimal);
        return ResponseEntity.noContent().build();
    }

}
