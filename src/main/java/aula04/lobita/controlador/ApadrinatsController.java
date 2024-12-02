package aula04.lobita.controlador;

import aula04.lobita.models.Animals;
import aula04.lobita.models.Apadrinats;
import aula04.lobita.models.TipusAnimals;
import aula04.lobita.models.Usuaris;
import aula04.lobita.repositori.AnimalsRepository;
import aula04.lobita.repositori.ApadrinatsRepository;
import aula04.lobita.repositori.TipusAnimalsRepository;
import aula04.lobita.repositori.UsuarisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
public class ApadrinatsController {

    private ApadrinatsRepository apadrinatsRepository;
    private LocalDate dataAlta = LocalDate.now();
    private LocalDate dataActual = LocalDate.now();
    private LocalDate dataEntrada = LocalDate.now();
    private static final Logger logger = Logger.getLogger(ApadrinatsController.class.getName());
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private TipusAnimalsRepository tipusAnimalsRepository;
    @Autowired
    private UsuarisRepository usuarisRepository;
    @Autowired
    private AnimalsRepository animalsRepository;

    @Autowired
    public ApadrinatsController(ApadrinatsRepository apadrinatsRepository) { this.apadrinatsRepository = apadrinatsRepository;}

    /**
     * Mètode que respon a una petició GET on crea i guarda animals apadrinats per usuaris predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @Profile("dev") // Només disponible en el perfil "dev"
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearApadrinats")
    public ResponseEntity<Void> crearApadrinat() {
        TipusAnimals tipusAnimals = tipusAnimalsRepository.findById(1)
                .orElseGet(() -> {
                    TipusAnimals nouTipus = new TipusAnimals("Gossos", "gos.jpg", "Imatge d'un gos");
                    return tipusAnimalsRepository.save(nouTipus);
                });
        Usuaris usuaris = usuarisRepository.findById(1)
                .orElseGet(() -> {
                    Usuaris nouUsuari = new Usuaris("Susana", "Garcia Nicolas", "susan@hotmail.com", "123456789", "susangn", passwordEncoder.encode("Hola23/*"), dataActual, true, "/imatges/perfilCaball.jpeg");
                    return usuarisRepository.save(nouUsuari);
                });
        Animals animals = animalsRepository.findById(1)
                .orElseGet(() -> {
                    Animals nouAnimal = new Animals("Bob", dataEntrada, tipusAnimals, "Delmon", "Sa", 1, "Negre taques blanques", 3.5f, 15.5f, "Mitja", "Mascle", true, true, "dkdld2525355fadd", "Sociable", "Medicació", "perro.jpg", "Imatge del gos", "Cap Observació",false, false);
                    return animalsRepository.save(nouAnimal);
                });

        Apadrinats apadrinat1 = new Apadrinats(dataAlta, 25.0f, usuaris, animals);
        apadrinatsRepository.save(apadrinat1);
        return ResponseEntity.ok().build();
    }

    /**
     * Mètode que respon a una petició GET per mostrar i visualitzar els animals apadrinats per usuaris a l'aplicació.
     * @return La llista d'animals apadrinats per usuaris.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/apadrinats")
    public List<Apadrinats> getApadrinats() { return apadrinatsRepository.findAll(); }

    /**
     * Mètode que respon a una petició GET perquè retorni un animal apadrinat per un usuari per ID.
     * @param idRelacio ID de la relació.
     * @return un ResponseEntity que pot ser un error si no troba l'animal apadrinat per un usuari.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/apadrinat/{idRelacio}")
    public ResponseEntity<Apadrinats> getApadrinat(@PathVariable Integer idRelacio){
        Optional<Apadrinats> apadrinat = apadrinatsRepository.findById(idRelacio);
        if (apadrinat.isEmpty()){
            return ResponseEntity.badRequest().build();
        }else {
            return ResponseEntity.ok(apadrinat.get());
        }
    }

    /**
     * Mètode que respon a una petició POST per guardar un animal apadrinat per un usuari.
     * @param dataAlta
     * @param quotaMensual
     * @param idUsuari
     * @param idAnimal
     * @return Retorna l'apadrinació creada o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/apadrinats")
    public ResponseEntity<Apadrinats> guardarApadrinat(
            @RequestParam("dataAlta") String dataAlta,
            @RequestParam("quotaMensual") Float quotaMensual,
            @RequestParam("idUsuari") Integer idUsuari,
            @RequestParam("idAnimal") Integer idAnimal){

        //Buscar 'Usuari' per ID
        Optional<Usuaris> usuarisOpttional = usuarisRepository.findById(idUsuari);
        if (usuarisOpttional.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Usuaris usuaris = usuarisOpttional.get();
        logger.info("usuari: " + usuarisOpttional);

        //Buscar 'Animal' per ID
        Optional<Animals> animalsOpt = animalsRepository.findById(idAnimal);
        if (animalsOpt.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Animals animals = animalsOpt.get();
        logger.info("animals: " +animals);

        //Parseig de la data d'alta.
        LocalDate dataAltaParse;
        try {
            dataAltaParse = LocalDate.parse(dataAlta);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(new Apadrinats());
        }

        //Guardem els animals apadrinats per usuaris a la BBDD
        Apadrinats apadrinat = new Apadrinats(dataAltaParse, quotaMensual, usuaris, animals);
        apadrinatsRepository.save(apadrinat);
        return ResponseEntity.ok(apadrinat);
    }

    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre un apadrinament existent.
     * @param apadrinat Objecte apadrinat amb les dades actualitzades.
     * @return Retorna l'apadrinament actualitzat o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/apadrinats")
    public ResponseEntity<Apadrinats> actualizarApadrinat(@RequestBody Apadrinats apadrinat){
        try {
            if (apadrinat.getIdRelacio() == null){
                return ResponseEntity.badRequest().body(null);
            }
            System.out.println("id de la relació: " + apadrinat.getIdRelacio());

            //Buscar la relació a la base de dades, si no es troba retorna error.
            Optional<Apadrinats> apadrinatsExist = apadrinatsRepository.findById(apadrinat.getIdRelacio());
            if (apadrinatsExist.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            System.out.println("id de la relació:" +apadrinatsExist.get().getIdRelacio());

            //Guardar la relació actualitzada.
            Apadrinats apadrinatActualitzat = apadrinatsRepository.save(apadrinat);
            // Imprimir les dades rebudes per depurar.
            System.out.println("Dades rebudes: " + apadrinat);
            //Retorna la resposta amb l'apadrinament actualitzat.
            return ResponseEntity.ok(apadrinatActualitzat);

        }catch (Exception e){
            //En cas d'error, imprimeix missatge error i retorna resposta amb codi
            System.out.println("Error en actualitzar l'animal apadrinat: "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Mètode que utilitza una operació delete per eliminar un apadrinament de la base de dades.
     * @param idRelacio ID de la relació d'apadrinament a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/apadrinat/{idRelacio}")
    public ResponseEntity<Apadrinats> deleteApadrinat(@PathVariable Integer idRelacio){
        if (idRelacio == null || !apadrinatsRepository.existsById(idRelacio)){
            return ResponseEntity.badRequest().body(null);
        }
        apadrinatsRepository.deleteById(idRelacio);
        return ResponseEntity.noContent().build();
    }
}