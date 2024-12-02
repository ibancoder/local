package aula04.lobita.controlador;

import aula04.lobita.models.*;
import aula04.lobita.repositori.*;
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
public class AdoptatsController {

    private AdoptatsRepository  adoptatsRepository;
    private LocalDate dataAlta = LocalDate.now();
    private LocalDate dataActual = LocalDate.now();
    private LocalDate dataEntrada = LocalDate.now();
    private static final Logger logger = Logger.getLogger(AdoptatsController.class.getName());
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private TipusAnimalsRepository tipusAnimalsRepository;
    @Autowired
    private UsuarisRepository usuarisRepository;
    @Autowired
    private AnimalsRepository animalsRepository;

    @Autowired
    public AdoptatsController(AdoptatsRepository adoptatsRepository) { this.adoptatsRepository = adoptatsRepository;}

    /**
     * Mètode que respon a una petició GET on crea i guarda animals adoptats per usuaris predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @Profile("dev") // Només disponible en el perfil "dev"
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearAdoptats")
    public ResponseEntity<Void> crearAdoptats() {
        TipusAnimals tipusAnimals = tipusAnimalsRepository.findById(1)
                .orElseGet(() -> {
                    TipusAnimals nouTipus = new TipusAnimals("Gossos", "gos.jpg", "Imatge d'un gos");
                    return tipusAnimalsRepository.save(nouTipus);
                });
        Usuaris usuaris = usuarisRepository.findById(1)
                .orElseGet(() -> {
                    Usuaris nouUsuari = new Usuaris("Pere", "Poma", "pere@hotmail.com", "123456789", "pere", passwordEncoder.encode("Hola23/*"), dataActual, true, "/imatges/perfilCaball.jpeg");
                    return usuarisRepository.save(nouUsuari);
                });
        Animals animals = animalsRepository.findById(1)
                .orElseGet(() -> {
                    Animals nouAnimal = new Animals("Piru", dataEntrada, tipusAnimals, "Colom", "Sa", 1, "Gris", 2f, 15.5f, "Petit", "Femella", true, true, "dkdld2525355fadd", "Sociable", "Medicació", "pajaro.jpg", "Imatge del ocell", "Cap Observació",false, false);
                    return animalsRepository.save(nouAnimal);
                });

        Adoptats adoptats1 = new Adoptats(dataAlta, usuaris, animals);
        adoptatsRepository.save(adoptats1);
        return ResponseEntity.ok().build();
    }

    /**
     * Mètode que respon a una petició GET per mostrar i visualitzar els animals adoptats per usuaris a l'aplicació.
     * @return La llista d'animals apadrinats per usuaris.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/adoptats")
    public List<Adoptats> getAdoptats() { return adoptatsRepository.findAll(); }

    /**
     * Mètode que respon a una petició GET perquè retorni un animal adoptat per un usuari per ID.
     * @param idRelacio ID de la relació.
     * @return un ResponseEntity que pot ser un error si no troba l'animal adoptat per un usuari.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/adoptat/{idRelacio}")
    public ResponseEntity<Adoptats> getAdoptat(@PathVariable Integer idRelacio){
        Optional<Adoptats> adoptat = adoptatsRepository.findById(idRelacio);
        if (adoptat.isEmpty()){
            return ResponseEntity.badRequest().build();
        }else {
            return ResponseEntity.ok(adoptat.get());
        }
    }

    /**
     * Mètode que respon a una petició POST per guardar un animal adoptat per un usuari.
     * @param dataAlta
     * @param idUsuari
     * @param idAnimal
     * @return Retorna l'adopció creada o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/adoptats")
    public ResponseEntity<Adoptats> guardarAdoptat(
            @RequestParam("dataAlta") String dataAlta,
            @RequestParam("idUsuari") Integer idUsuari,
            @RequestParam("idAnimal") Integer idAnimal){

        //Buscar 'Usuari' per ID
        Optional<Usuaris> usuarisOpt = usuarisRepository.findById(idUsuari);
        if (usuarisOpt.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Usuaris usuaris = usuarisOpt.get();
        logger.info(usuaris.toString());

        //Buscar 'Animal' per ID
        Optional<Animals> animalsOpt = animalsRepository.findById(idAnimal);
        if (animalsOpt.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Animals animals = animalsOpt.get();
        logger.info(animals.toString());

        //Parseig de la data d'alta.
        LocalDate dataAltaParse;
        try {
            dataAltaParse = LocalDate.parse(dataAlta);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(new Adoptats());
        }

        //Guardem els animals adoptats per usuaris a la BBDD
        Adoptats adoptat = new Adoptats(dataAltaParse, usuaris, animals);
        adoptatsRepository.save(adoptat);
        return ResponseEntity.ok(adoptat);
    }

    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre una adopció existent.
     * @param adoptat Objecte adoptat amb les dades actualitzades.
     * @return Retorna l'adopció actualitzada o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/adoptats")
    public ResponseEntity<Adoptats> actualizarAdoptat(@RequestBody Adoptats adoptat){
        try {
            if (adoptat.getIdRelacio() == null){
                return ResponseEntity.badRequest().body(null);
            }
            System.out.println("id de la relació: " + adoptat.getIdRelacio());

            //Buscar la relació a la base de dades, si no es troba retorna error.
            Optional<Adoptats> adoptatsExist = adoptatsRepository.findById(adoptat.getIdRelacio());
            if (adoptatsExist.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            System.out.println("id de la relació:" +adoptatsExist.get().getIdRelacio());

            //Guardar la relació actualitzada.
            Adoptats adoptatActualitzat = adoptatsRepository.save(adoptat);
            // Imprimir les dades rebudes per depurar.
            System.out.println("Dades rebudes: " + adoptat);
            //Retorna la resposta amb l'adopció actualitzada.
            return ResponseEntity.ok(adoptatActualitzat);

        }catch (Exception e){
            //En cas d'error, imprimeix missatge error i retorna resposta amb codi
            System.out.println("Error en actualitzar l'animal adoptat: "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Mètode que utilitza una operació delete per eliminar una adopció de la base de dades.
     * @param idRelacio ID de la relació d'adopció a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/adoptat/{idRelacio}")
    public ResponseEntity<Adoptats> deleteAdoptat(@PathVariable Integer idRelacio){
        if (idRelacio == null || !adoptatsRepository.existsById(idRelacio)){
            return ResponseEntity.badRequest().body(null);
        }
        adoptatsRepository.deleteById(idRelacio);
        return ResponseEntity.noContent().build();
    }
}