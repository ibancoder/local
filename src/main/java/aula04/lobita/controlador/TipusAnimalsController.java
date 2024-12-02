package aula04.lobita.controlador;
import aula04.lobita.models.TipusAnimals;
import aula04.lobita.repositori.TipusAnimalsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
public class TipusAnimalsController {

    private final TipusAnimalsRepository tipusAnimalsRepository;
    private static final Logger logger = LoggerFactory.getLogger(TipusAnimalsController.class);

    /**
     * Controlador REST per gestionar els tipus d'animals de l'aplicació.
     * @param tipusAnimalsRepository Repositori per accedir als tipus d'animals.
     */
    public TipusAnimalsController(TipusAnimalsRepository tipusAnimalsRepository) {
        this.tipusAnimalsRepository = tipusAnimalsRepository;
    }


    /**
     * Mètode que respon a una petició GET on crea i guarda tipus d'animals predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @Profile("dev") // Només disponible en el perfil "dev"
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearTipusAnimal")
    public void crearTipusAnimal() {
        TipusAnimals tipusAnimal1 = new TipusAnimals("Gossos", "gossos.jpeg", "Imatges de gossos");
        TipusAnimals tipusAnimal2 = new TipusAnimals("Gats", "gats.jpeg", "Imatges de gats");
        TipusAnimals tipusAnimal3 = new TipusAnimals("Ocells", "ocells.jpeg", "Imatge d'ocells");
        tipusAnimalsRepository.save(tipusAnimal1);
        tipusAnimalsRepository.save(tipusAnimal2);
        tipusAnimalsRepository.save(tipusAnimal3);
    }


    /**
     * Mètode que respon a una petició GET per mostrar i visualitzar els tipus d'animals a l'aplicació.
     * @return La llista de tipus d'animals.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/tipusAnimals")
    public List<TipusAnimals> getTipusAnimals() {
        return tipusAnimalsRepository.findAll();
    }


    /**
     * Mètode que respon a una petició GET perquè retorni un tipus d'animal per ID.
     * @param idTipusAnimal ID del tipus d'animal.
     * @return un ResponseEntity que pot ser un error si no troba el tipus d'animal.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/tipusAnimal/{idTipusAnimal}")
    public ResponseEntity<TipusAnimals> getTipusAnimal(@PathVariable Integer idTipusAnimal) {
        Optional<TipusAnimals> opt = tipusAnimalsRepository.findById(idTipusAnimal);
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
    public ResponseEntity<TipusAnimals> guardarTipusAnimal(
            @RequestParam("nomTipusAnimal") String nomTipusAnimal,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("alt") String alt){

        //Foto
        if (foto.isEmpty()){
            return ResponseEntity.badRequest().body(new TipusAnimals());
        }
        logger.info("Nom imatge: " + foto.getOriginalFilename());
        logger.info("Alt imatge: " + alt);
        logger.info("Mida imatge: " + foto.getSize() + " bytes");

        //Ruta per guardar imatges en el servidor.
        String ruta = "/tmp/";
        //Ruta per guardar imatges en proves en local.
        //String ruta = "E:/Cursos Udemy/Universidad_Java/Practicas/lobita/src/main/resources/static/imatges";

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
        TipusAnimals tipusAnimals = new TipusAnimals(nomTipusAnimal, foto.getOriginalFilename(), alt);
        tipusAnimalsRepository.save(tipusAnimals);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipusAnimals);
    }


    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre un tipus d'animal existent.
     * @param tipusAnimal Objecte tipusAnimal amb les dades actualitzades.
     * @return Retorna el tipus d'animal actualitzat o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/tipusAnimals")
    public ResponseEntity<TipusAnimals> actualitzarTipusAnimal(@RequestBody TipusAnimals tipusAnimal) {
        if (tipusAnimal.getIdTipusAnimal() == null || !tipusAnimalsRepository.existsById(tipusAnimal.getIdTipusAnimal())) {
            return ResponseEntity.badRequest().build();
        }
        tipusAnimalsRepository.save(tipusAnimal);
        return ResponseEntity.ok(tipusAnimal);
    }

    /**
     * Mètode que utilitza una operació delete per eliminar un tipus d'animal de la base de dades.
     * @param idTipusAnimal ID del tipus d'animal a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/tipusAnimal/{idTipusAnimal}")
    public ResponseEntity<TipusAnimals> deleteTipusAnimal(@PathVariable Integer idTipusAnimal) {
        if (idTipusAnimal == null || !tipusAnimalsRepository.existsById(idTipusAnimal)) {
            return ResponseEntity.badRequest().build();
        }
        tipusAnimalsRepository.deleteById(idTipusAnimal);
        return ResponseEntity.noContent().build();
    }
}