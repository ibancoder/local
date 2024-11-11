package aula04.lobita.controlador;
import aula04.lobita.models.Usuaris;
import aula04.lobita.repositori.UsuarisRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class UsuarisController {

    private final UsuarisRepository usuarisRepository;
    private final LocalDate dataActual = LocalDate.now();
    private static final Logger logger = LoggerFactory.getLogger(UsuarisController.class);
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    /**
     * Controlador REST per gestionar els Usuaris de l'aplicació.
     * @param usuarisRepository Repositori per accedir als Usuaris.
     */
    public UsuarisController(UsuarisRepository usuarisRepository) { this.usuarisRepository = usuarisRepository; }


    /**
     * Mètode que respon a una petició GET on crea i guarda Usuaris predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearUsuaris")
    public void crearUsuaris() {
        Usuaris usuari1 = new Usuaris("Susana", "Garcia Nicolas", "susan@hotmail.com", "123456789", "susangn", passwordEncoder.encode("Hola23/*"), dataActual, true, "/imatges/perfilCaball.jpeg");
        Usuaris usuari2 = new Usuaris("Sandra", "Campos Perez", "sandra@hotmail.com", "123456789", "sandra56", passwordEncoder.encode("Hola23/*"), dataActual, true, "/imatges/perfilConill.jpeg");
        usuarisRepository.save(usuari1);
        usuarisRepository.save(usuari2);
    }


    /**
     * Mètode que respon a una petició GET per mostrar visualitzar els Usuaris a l'aplicació.
     * @return La llista d'Usuaris.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/Usuaris")
    public List<Usuaris> getUsuaris() { return usuarisRepository.findAll(); }


    /**
     * Mètode que respon a una petició GET perquè retorni un usuari per ID.
     * @param idUsuari ID de l'usuari.
     * @return un ResponseEntity que pot ser un error si no troba l'usuari.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/usuari/{idUsuari}")
    public ResponseEntity<Usuaris> getUsuari(@PathVariable Integer idUsuari) {
        Optional<Usuaris> usuari = usuarisRepository.findById(idUsuari);
        if (usuari.isPresent()) {
            return ResponseEntity.ok(usuari.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    /**
     * Mètode POST que respon a una petició POST per guardar l'usuari creat.
     * @param nom       Nom de l'usuari.
     * @param cognoms   Cognoms de l'usuari.
     * @param email     Email de l'usuari.
     * @param telefon   Telèfon de l'usuari.
     * @param nomUsuari Nom de l'usuari.
     * @param password  Contrasenya de l'usuari.
     * @param actiu     Usuari actiu o no, no és requerit.
     * @param foto      Foto avatar de l'usuari, no és requerit.
     * @return Retorna l'usuari creat o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/usuaris")
    public ResponseEntity<?> guardarUsuari(
            @RequestParam("nom") String nom,
            @RequestParam("cognoms") String cognoms,
            @RequestParam("email") String email,
            @RequestParam("telefon") String telefon,
            @RequestParam("nomUsuari") String nomUsuari,
            @RequestParam("password") String password,
            @RequestParam(required = false) Boolean actiu,
            @RequestParam(required = false) String foto) {

        //Verificar si el nom de l'usuari o l'email ja existeixen.
        if (usuarisRepository.existsByNomUsuari(nomUsuari)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: El nom d'usuari ja existeix.");
        }
        if (usuarisRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Aquest email ja està registrat.");
        }

        //Encriptem la contrasenya abans de guardarla a la BBDD.
        String encryptedPassword = passwordEncoder.encode(password);

        //Guardem l'usuari a la BBDD.
        Usuaris usuari = new Usuaris(nom, cognoms, email, telefon, nomUsuari, encryptedPassword, dataActual, actiu, foto);
        logger.info("Guardant usuari: nom={}, cognoms={}, email={}", nom, cognoms, email, actiu);
        usuarisRepository.save(usuari);
        logger.info("Usuari guardat a la base de dades correctament: {}", usuari);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuari);
    }


    /**
     * Mètode POST per inicialitzar la sessió fent login amb les dades del nomUsuari i el password
     * @param usuaris Objecte usuari amb les seves dades.
     * @return Retorna l'usuari l'autenticació de l'usuari o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Usuaris usuaris) {
        String nomUsuari = usuaris.getNomUsuari();
        String password = usuaris.getPassword();

        //Busquem a l'usuari per el nom de usuari.
        Optional<Usuaris> usuariOpt = usuarisRepository.findByNomUsuari(nomUsuari);
        if (usuariOpt.isPresent()) {
            Usuaris usuari = usuariOpt.get();
            //Verificar la constrasenya encriptada amb el password
            if (passwordEncoder.matches(password, usuari.getPassword())) {
                return ResponseEntity.ok(usuari);
            }
        }
        logger.warn("Intent de login fallit HTTP 401(unauthotized): nomUsuari={}, password={}", nomUsuari, password);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuari o contrasenya incorrectes!");
    }


    /**
     * Mètode PUT per modificar les dades de l'usuari i també afegir la foto o sí és actiu.
     * @param usuaris Objecte usuari amb les dades actualitzades.
     * @return Retorna l'usuari actualitzat o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/Usuaris")
    public ResponseEntity<Usuaris> actualitzarUsuari(@RequestBody Usuaris usuaris) {
        if (usuaris.getIdUsuari() == null || !usuarisRepository.existsById(usuaris.getIdUsuari())) {
            return ResponseEntity.badRequest().build();
        }
        usuarisRepository.save(usuaris);
        return ResponseEntity.ok(usuaris);
    }


    /**
     * Mètode DELETE que elimina un usuari de la base de dades.
     * @param idUsuari ID de l'usuari a eliminar.
     * @return Retorna una rsposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/usuari/{idUsuari}")
    public ResponseEntity<Usuaris> deleteUsuari(@PathVariable Integer idUsuari) {
        if (idUsuari == null || !usuarisRepository.existsById(idUsuari)) {
            return ResponseEntity.badRequest().build();
        }
        usuarisRepository.deleteById(idUsuari);
        return ResponseEntity.noContent().build();
    }
}


