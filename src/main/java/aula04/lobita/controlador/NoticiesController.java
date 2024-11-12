package aula04.lobita.controlador;

import aula04.lobita.models.Noticies;
import aula04.lobita.repositori.NoticiesRepository;
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
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
public class NoticiesController {

    NoticiesRepository noticiesRepository;
    LocalDate dataActual = LocalDate.now();
    private static final Logger logger = LoggerFactory.getLogger(NoticiesController.class);

    /**
     * Controlador REST per gestionar les notícies de l'aplicació.
     * @param noticiesRepository Repositori per accedir a les notícies.
     */
    public NoticiesController(NoticiesRepository noticiesRepository) { this.noticiesRepository = noticiesRepository; }


    /**
     * Mètode que respon a una petició GET on crea i guarda notícies predeterminades a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearNoticies")
    public void crearNoticies() {
        Noticies noticia1 = new Noticies(dataActual, "Factures de veterinaris2", "Necesitem ajuda per pagar les ultimes factures de veterinaris", "gato.jpg", "Imatge de Gat", "#Donar", "Donar", true);
        Noticies noticia2 = new Noticies(dataActual, "Acollida Urgent", "Busquem casa d'acollida urgent", "perro.jpg", "Imatge de Gos", "#Acollir", "Acollir", true);
        noticiesRepository.save(noticia1);
        noticiesRepository.save(noticia2);
    }


    /**
     * Mètode que respon a una petició GET per mostrar visualitzar les notícies a l'aplicació
     * @return La llista de notícies.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/noticies")
    public List<Noticies> getNoticies() { return noticiesRepository.findAll(); }


    /**
     * Mètode que respon a una petició GET perquè retorni una notícia per ID.
     * @param idNoticia ID de la notícia.
     * @return un ResponseEntity que pot ser un error si no troba la notícia.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/noticia/{idNoticia}")
    public ResponseEntity<Noticies> getNoticia(@PathVariable Integer idNoticia) {
        Optional<Noticies> opt = noticiesRepository.findById(idNoticia);
        if (opt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(opt.get());
        }
    }


    /**
     * Mètode que respon a una petició POST per guardar la notícia creada.
     * @param dataNoticia Data de la notícia.
     * @param titol Títol de la notícia.
     * @param descripcio Descripció de la notícia.
     * @param foto Fitxer de la imatge.
     * @param alt Text alternatiu a la imatge.
     * @param urlNoticia URL de la notícia.
     * @param nomBoto Nom del botó a mostrar.
     * @param activa Estat d'activació de la notícia.
     * @return Retorna la notícia creada o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/noticies")
    public ResponseEntity<Noticies> guardarNoticia(
            @RequestParam("dataNoticia") String dataNoticia,
            @RequestParam("titol") String titol,
            @RequestParam("descripcio") String descripcio,
            @RequestParam("foto") MultipartFile foto,
            @RequestParam("alt") String alt,
            @RequestParam("urlNoticia") String urlNoticia,
            @RequestParam("nomBoto") String nomBoto,
            @RequestParam("activa") boolean activa) {

        //Parseig de la data
        LocalDate dataNoticiaParse;
        try {
            dataNoticiaParse = LocalDate.parse(dataNoticia);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(new Noticies());
        }

        //Foto
        if (foto.isEmpty()) {
            return ResponseEntity.badRequest().body(new Noticies());
        }
        logger.info("Nom imatge: " + foto.getOriginalFilename());
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

        //Guardem les notícies en la BBDD
        Noticies noticia = new Noticies(dataNoticiaParse, titol, descripcio, foto.getOriginalFilename(), alt, urlNoticia, nomBoto, activa);
        noticiesRepository.save(noticia);
        return ResponseEntity.status(HttpStatus.CREATED).body(noticia);
    }


    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre una notícia existent.
     * @param noticies Objecte notícia amb les dades actualitzades.
     * @return Retorna la notícia actualitzada o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/noticies")
    public ResponseEntity<Noticies> actualitzarNoticia(@RequestBody Noticies noticies) {
        if (noticies.getIdNoticia() == null || !noticiesRepository.existsById(noticies.getIdNoticia())) {
            return ResponseEntity.badRequest().build();
        }
        noticiesRepository.save(noticies);
        return ResponseEntity.ok(noticies);
    }


    /**
     * Mètode que utilitza una operació delete per eliminar una notícia de la base de dades.
     * @param idNoticia ID de la notícia a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/noticia/{idNoticia}")
    public ResponseEntity<Noticies> deleteNoticia(@PathVariable Integer idNoticia) {
        if (idNoticia == null || !noticiesRepository.existsById(idNoticia)) {
            return ResponseEntity.badRequest().build();
        }
        noticiesRepository.deleteById(idNoticia);
        return ResponseEntity.noContent().build();
    }
}

