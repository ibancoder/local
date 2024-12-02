package aula04.lobita.controlador;

import aula04.lobita.models.Animals;
import aula04.lobita.models.TipusAnimals;
import aula04.lobita.repositori.AnimalsRepository;
import aula04.lobita.repositori.TipusAnimalsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
public class AnimalsController {

    private AnimalsRepository animalsRepository;
    private LocalDate dataEntrada = LocalDate.now();
    private static final Logger logger = LoggerFactory.getLogger(AnimalsController.class);

    @Autowired
    private TipusAnimalsRepository tipusAnimalsRepository;

    @Autowired
    public AnimalsController(AnimalsRepository animalsRepository) {
        this.animalsRepository = animalsRepository;
    }

    /**
     * Mètode que respon a una petició GET on crea i guarda animals predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @Profile("dev") // Només disponible en el perfil "dev"
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearAnimals")
    public ResponseEntity<Void> crearAnimals() {
        //Busca un tipusAnimals existent o crea un de nou
        TipusAnimals tipusAnimals = tipusAnimalsRepository.findById(1)
                .orElseGet(() -> {
                    TipusAnimals nouTipus = new TipusAnimals("Gos", "gos.jpg", "Imatge d'un gos");
                    return tipusAnimalsRepository.save(nouTipus);
                });
        Animals animal1 = new Animals("Bob", dataEntrada, tipusAnimals, "Delmon", "Sa", 0, "Negre taques blanques", 3.5f, 15.5f, "Mitja", "Mascle", true, true, "dkdld2525355fadd", "Sociable", "Medicació", "perro.jpg", "Imatge del gos", "Cap Observació",false, false);
        animalsRepository.save(animal1);
        Animals animal2 = new Animals("Cuqui", dataEntrada, tipusAnimals, "Ocell", "Sa", 0, "Gris", 2f, 10f, "Petit", "Femella", true, true, "dkdldfadfas", "Sociable", "Medicació", "pajaro.jpg", "Imatge d'un ocell", "Cap Observació",false, false);
        animalsRepository.save(animal2);
        Animals animal3 = new Animals("Gatito", dataEntrada, tipusAnimals, "Gat siames", "Sa", 0, "Gris", 4f, 16f, "Gran", "Mascle", true, true, "d55822dfas", "Sociable", "Medicació", "gato.jpg", "Imatge d'un gat", "Cap Observació",false, false);
        animalsRepository.save(animal3);

        logger.info("TipusAnimals creat o recuperat: " + tipusAnimals.getNomTipusAnimal());
        logger.info("Animals creat: " + animal1.getNomAnimal());
        logger.info("Animals creat: " + animal2.getNomAnimal());
        logger.info("Animals creat: " + animal3.getNomAnimal());
        return ResponseEntity.ok().build();
    }

    /**
     * Mètode que respon a una petició GET per mostrar i visualitzar els animals a l'aplicació.
     * @return La llista d'animals.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/animals")
    public List<Animals> getAnimals() {
        return animalsRepository.findAll();
    }


    /**
     * Mètode que respon a una petició GET perquè retorni un animal per ID.
     * @param idAnimal ID de l'animal.
     * @return un ResponseEntity que pot ser un error si no troba l'animal.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/animal/{idAnimal}")
    public ResponseEntity<Animals> getAnimal(@PathVariable Integer idAnimal) {
        Optional<Animals> animal = animalsRepository.findById(idAnimal);
        if (animal.isEmpty()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(animal.get());
        }
    }

    /**
     * Mètode que respon a una petició POST per guardar l'animal.
     * @param nomAnimal
     * @param dataEntrada
     * @param idTipusAnimals
     * @param tipusRaca
     * @param estatSalut
     * @param estatAnimal
     * @param color
     * @param edat
     * @param pes
     * @param mida
     * @param sexe
     * @param esterilitzat
     * @param vacunat
     * @param xip
     * @param comportament
     * @param necessitats
     * @param foto
     * @param alt
     * @param observacions
     * @param apadrinat
     * @param rip
     * @return Retorna l'animal creat o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/animals")
    public ResponseEntity<Animals> guardarAnimal(
            @RequestParam("nomAnimal") String nomAnimal,
            @RequestParam("dataEntrada") String dataEntrada,
            @RequestParam("idTipusAnimal") Integer idTipusAnimals,
            @RequestParam("tipusRaca") String tipusRaca,
            @RequestParam("estatSalut") String estatSalut,
            @RequestParam("estatAnimal") Integer estatAnimal,
            @RequestParam("color") String color,
            @RequestParam("edat") Float edat,
            @RequestParam("pes") Float pes,
            @RequestParam("mida") String mida,
            @RequestParam("sexe") String sexe,
            @RequestParam("esterilitzat") boolean esterilitzat,
            @RequestParam("vacunat") boolean vacunat,
            @RequestParam("xip") String xip,
            @RequestParam("comportament") String comportament,
            @RequestParam("necessitats") String necessitats,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("alt") String alt,
            @RequestParam("observacions") String observacions,
            @RequestParam("apadrinat") boolean apadrinat,
            @RequestParam("rip") boolean rip) {

        //Buscar 'TipusAnimals' per ID
        Optional<TipusAnimals> tipusAnimalsOpt = tipusAnimalsRepository.findById(idTipusAnimals);
        if (tipusAnimalsOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        TipusAnimals tipusAnimals = tipusAnimalsOpt.get();
        logger.info("tipus Animal: " +tipusAnimals);

        //Parseig de la data d'entrada.
        LocalDate dataEntradaParse;
        try {
            dataEntradaParse = LocalDate.parse(dataEntrada);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(new Animals());
        }

        //Foto del Animal
        if (foto.isEmpty()) {
            return ResponseEntity.badRequest().body(new Animals());
        }

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

        //Guardem els animals en la BBDD
        Animals animal = new Animals(nomAnimal, dataEntradaParse, tipusAnimals, tipusRaca, estatSalut, estatAnimal,
                color, edat, pes, mida, sexe, esterilitzat, vacunat, xip, comportament, necessitats,
                foto.getOriginalFilename(), alt, observacions, apadrinat, rip);
        animalsRepository.save(animal);
        return ResponseEntity.ok(animal);
    }

    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre un animal existent.
     * @param animal Objecte animal amb les dades actualitzades.
     * @return Retorna l'animal actualitzat o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/animals")
    public ResponseEntity<Animals> actualitzarAnimal(@RequestBody Animals animal) {
        try{
            // Validar si el ID del animal es null, si no existeix retorna error.
            if (animal.getIdAnimal() == null ){
                return ResponseEntity.badRequest().body(null);
            }
            System.out.println("id del animal: " + animal.getIdAnimal());

            //Buscar l'animal a la base de dades, si no es troba retorna error.
            Optional<Animals> animalExist = animalsRepository.findById(animal.getIdAnimal());
            if (animalExist.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            System.out.println("id del animal: " + animalExist.get().getIdAnimal());

            //Guardar l'animal actualitzat.
            Animals animalActualitzat = animalsRepository.save(animal);
            // Imprimir les dades rebudes per depurar.
            System.out.println("Dades rebudes: " + animal);
            //Retorna la resposta amb l'animal actualitzat.
            return ResponseEntity.ok(animalActualitzat);


        } catch (Exception e) {
            //En cas d'error, imprimeix missatge error i retorna resposta amb codi
            System.out.println("Error en actualitzar l'animal: "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Mètode que utilitza una operació delete per eliminar un animal de la base de dades.
     * @param idAnimal ID de l'animal a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/animal/{idAnimal}")
    public ResponseEntity<Animals> deleteAnimal(@PathVariable Integer idAnimal) {
        if (idAnimal == null || !animalsRepository.existsById(idAnimal)){
            return ResponseEntity.badRequest().build();
        }
        animalsRepository.deleteById(idAnimal);
        return ResponseEntity.noContent().build();
    }
}




