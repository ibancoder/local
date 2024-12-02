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
public class DonacionsController {

    private DonacionsRepository donacionsRepository;
    private LocalDate dataAlta;
    private LocalDate dataDonacio = LocalDate.now();
    private static final Logger logger = Logger.getLogger(AdoptatsController.class.getName());
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UsuarisRepository usuarisRepository;

    @Autowired
    public DonacionsController(DonacionsRepository donacionsRepository) { this.donacionsRepository = donacionsRepository; }

    /**
     * Mètode que respon a una petició GET on crea i guarda les donacions dels usuaris predeterminats a la base de dades.
     * Només en ús per inicialitzar la base de dades en el desenvolupament.
     */
    @Profile("dev") // Només disponible en el perfil "dev"
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearDonacions")
    public ResponseEntity<Void> crearDonacions() {
        Usuaris usuaris = usuarisRepository.findById(1)
                .orElseGet(() -> {
                    Usuaris nouUsuari = new Usuaris("Susana", "Garcia", "susana@hotmail.com", "123456789", "susana", passwordEncoder.encode("Hola23/*"), dataAlta, true, "/imatges/perfilCaball.jpeg");
                    return usuarisRepository.save(nouUsuari);
                });
        Donacions donacions = new Donacions(dataDonacio, 25.0f, usuaris);
        donacionsRepository.save(donacions);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Mètode que respon a una petició GET per mostrar i visualitzar les donacions fetes per usuaris a l'aplicació.
     * @return La llista de donacions per usuaris.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/donacions")
    public List<Donacions> getDonacions() { return donacionsRepository.findAll(); }

    /**
     * Mètode que respon a una petició GET perquè retorni una donació per un usuari per ID.
     * @param idDonacio ID de la donació
     * @return un ResponseEntity que pot ser un error si no troba la donació per un usuari.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("api/donacio/{idDonacio}")
    public ResponseEntity<Donacions> getDonacio(@PathVariable Integer idDonacio){
        Optional<Donacions> donacionsOptional = donacionsRepository.findById(idDonacio);
        if (donacionsOptional.isEmpty()){
            return ResponseEntity.badRequest().build();
        }else {
            return ResponseEntity.ok(donacionsOptional.get());
        }
    }

    /**
     * Mètode que respon a una petició POST per guardar una donació per un usuari.
     * @param dataDonacio
     * @param quantitat
     * @param idUsuari
     * @return Retorna la donació creada o un error si hi ha problema amb la validació.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/donacions")
    public ResponseEntity<Donacions> guardarDonacio(
            @RequestParam("dataDonacio") String dataDonacio,
            @RequestParam("quantitat") Float quantitat,
            @RequestParam("idUsuari") Integer idUsuari){

        //Buscar 'Usuari' per ID
        Optional<Usuaris> usuarisOpt = usuarisRepository.findById(idUsuari);
        if (usuarisOpt.isEmpty()){
            return ResponseEntity.badRequest().body(null);
        }
        Usuaris usuaris = usuarisOpt.get();
        logger.info(usuaris.toString());

        //Parseig de la data d'alta.
        LocalDate dataDonacioParse;
        try {
            dataDonacioParse = LocalDate.parse(dataDonacio);
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(new Donacions());
        }

        //Guardem les donacions per usuaris a la BBDD
        Donacions donacio = new Donacions(dataDonacioParse, quantitat, usuaris);
        donacionsRepository.save(donacio);
        return ResponseEntity.ok(donacio);
    }

    /**
     * Mètode que s'utilitza per realitzar actualitzacions (PATCH) sobre una donació existent.
     * @param donacions Objecte donació amb les dades actualitzades.
     * @return Retorna la donació actualitzada o un error.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/donacions")
    public ResponseEntity<Donacions> actualizarDonacio(@RequestBody Donacions donacions){
        try {
            if (donacions.getIdDonacio() == null){
                return ResponseEntity.badRequest().body(null);
            }
            System.out.println("id de la relació: " + donacions.getIdDonacio());

            //Buscar la relació a la base de dades, si no es troba retorna error.
            Optional<Donacions> donacioExist = donacionsRepository.findById(donacions.getIdDonacio());
            if (donacioExist.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            System.out.println("id de la relació:" +donacioExist.get().getIdDonacio());

            //Guardar la donació actualitzada.
            Donacions donacioActualitzada = donacionsRepository.save(donacions);
            // Imprimir les dades rebudes per depurar.
            System.out.println("Dades rebudes: " + donacions);
            //Retorna la resposta amb la donació actualitzada.
            return ResponseEntity.ok(donacioActualitzada);

        }catch (Exception e){
            //En cas d'error, imprimeix missatge error i retorna resposta amb codi
            System.out.println("Error en actualitzar la donació: "+e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Mètode que utilitza una operació delete per eliminar una donació de la base de dades.
     * @param idDonacio ID de la donació a eliminar.
     * @return Retorna una resposta de no contingut si és exitós.
     */
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/donacio/{idDonacio}")
    public ResponseEntity<Donacions> deleteDonacio(@PathVariable Integer idDonacio){
        if (idDonacio == null || !donacionsRepository.existsById(idDonacio)){
            return ResponseEntity.badRequest().body(null);
        }
        donacionsRepository.deleteById(idDonacio);
        return ResponseEntity.noContent().build();
    }
}