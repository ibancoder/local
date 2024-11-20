package aula04.lobita.controlador;

import aula04.lobita.dto.AnimalDTO;
import aula04.lobita.models.Animals;
import aula04.lobita.models.TipusAnimal;
import aula04.lobita.repositori.AnimalsRepository;
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
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
public class AnimalsController {

    private final AnimalsRepository animalsRepository;
    private final LocalDate dataActual = LocalDate.now();
    private static final Logger logger = LoggerFactory.getLogger(AnimalsController.class);
    private final TipusAnimalRepository tipusAnimalRepository;

    /**
     * Rest Controller to handle Animals on App.
     * @param animalsRepository Repository to access to Animals.
     */
    public AnimalsController(AnimalsRepository animalsRepository, TipusAnimalRepository tipusAnimalRepository) {
        this.animalsRepository = animalsRepository;
        this.tipusAnimalRepository = tipusAnimalRepository;
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearanimals")
    public void crearAnimals(){
        TipusAnimal tipusAnimal = tipusAnimalRepository.findById(1)
                .orElseThrow(() -> new RuntimeException("Tipus Animal no trovat a la base de dades"));
        Animals animal1 = new Animals("Paris",dataActual,tipusAnimal,"Caniche","Sà",0,"Blanc",11.2F,18F,"Gran","Mascle",true,true,"dsfds322","Sociable","Cap","perro.img","imatge de gos","Cap observacio",false);
        animalsRepository.save(animal1);
        logger.info("Tipus animal creat o recuperat: " + tipusAnimal.getNomtipusanimal());
        logger.info("Animal creat: "+ animal1.getNomAnimal());
    }
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/animals")
    public List<AnimalDTO> getAllAnimals(){
        return animalsRepository.findAll()
                .stream()
                .map(AnimalDTO::new)
                .toList();
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/animals/{id}")
    public ResponseEntity<AnimalDTO> getAnimalById(@PathVariable Integer id){
        Optional<Animals> animal = animalsRepository.findById(id);
        return animal.map( a -> ResponseEntity.ok(new AnimalDTO(a))).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/animals")
    public ResponseEntity<Animals> guardarAnimal (
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
            @RequestParam("rip") boolean rip) {
            //Buscar "TipusAnimal" per ID
        Optional<TipusAnimal>tipusAnimalOpt = tipusAnimalRepository.findById(idTipusAnimals);
        if(tipusAnimalOpt.isEmpty()){
            return ResponseEntity.badRequest().body(null); //Error si no es trova
        }
        TipusAnimal tipusAnimal = tipusAnimalOpt.get();

        //Parse de la data d'entrada
        LocalDate dataEntradaParse;
        try {
            dataEntradaParse = LocalDate.parse(dataEntrada);
        }catch (DateTimeParseException e){
            return ResponseEntity.badRequest().body(new Animals());
        }

        //Foto Animal
        if (foto.isEmpty()){
            return ResponseEntity.badRequest().body(new Animals());
        }
        logger.info("Nom imatge: "+ foto.getOriginalFilename());
        logger.info("Mida imatge: " + foto.getSize() + " bytes");

        //Ruta per guardar imatges al servidor
        //String ruta = "/temp/";
        //Ruta per guardar imatges en proves en local.
        String ruta = "C:/Users/iban7/Desktop/Local/src/main/resources/static/imatges";

        try {
            Path rutaCompleta = Paths.get(ruta, foto.getOriginalFilename());
            Files.write(rutaCompleta, foto.getBytes());
        } catch (IOException e) {
            logger.error("Error en guardar la imatge a la ruta: "+ ruta + foto.getOriginalFilename());
            logger.error("Missatge d0error: {}", e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        //Guardem els animals a la BBDD
        Animals animal = new Animals(nomAnimal, dataEntradaParse, tipusAnimal, tipusRaca, estatSalut, estatAnimal, color,edat,pes,mida,sexe,
                esterilitzat,vacunat,xip,comportament,necessitats, foto.getOriginalFilename(), alt,observacions, rip);
        animalsRepository.save(animal);
        return ResponseEntity.ok(animal);
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/animals/{id}")
    public ResponseEntity<Animals> updateAnimal(@PathVariable Integer id, @RequestBody AnimalDTO updatedAnimal){
        return animalsRepository.findById(id)
                .map(existingAnimal -> {
                    //Actualitza camps bàsics
                    existingAnimal.setNomAnimal(updatedAnimal.getNomAnimal());
                    existingAnimal.setDataEntrada(updatedAnimal.getDataEntrada());
                    //existingAnimal.setTipusAnimal(updatedAnimal.getTipusAnimal());
                    existingAnimal.setTipusRaca(updatedAnimal.getTipusRaca());
                    existingAnimal.setEstatSalut(updatedAnimal.getEstatSalut());
                    existingAnimal.setEstatAnimal(updatedAnimal.getEstatAnimal());
                    existingAnimal.setColor(updatedAnimal.getColor());
                    existingAnimal.setEdat(updatedAnimal.getEdat());
                    existingAnimal.setPes(updatedAnimal.getPes());
                    existingAnimal.setMida(updatedAnimal.getMida());
                    existingAnimal.setSexe(updatedAnimal.getSexe());
                    existingAnimal.setEsterilitzat(updatedAnimal.getEsterilitzat());
                    existingAnimal.setVacunat(updatedAnimal.getVacunat());
                    existingAnimal.setXip(updatedAnimal.getXip());
                    existingAnimal.setComportament(updatedAnimal.getComportament());
                    existingAnimal.setNecessitats(updatedAnimal.getNecessitats());
                    existingAnimal.setFotoUrl(updatedAnimal.getFotoUrl());
                    existingAnimal.setAlt(updatedAnimal.getAlt());
                    existingAnimal.setObservacions(updatedAnimal.getObservacions());
                    existingAnimal.setRip(updatedAnimal.getRip());

                    //Actualitza la relació si es neceta
                    return ResponseEntity.ok(animalsRepository.save(existingAnimal));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PatchMapping("/api/animals/{id}")
    public ResponseEntity<Animals> partiallyUpdateAnimal(@PathVariable Integer id, @RequestBody Animals partialAnimal) {
        return animalsRepository.findById(id)
                .map(animal -> {
                    if (partialAnimal.getNomAnimal() != null) animal.setNomAnimal(partialAnimal.getNomAnimal());
                    if (partialAnimal.getDataEntrada() != null) animal.setDataEntrada(partialAnimal.getDataEntrada());
                    if (partialAnimal.getTipusAnimal() != null) animal.setTipusAnimal(partialAnimal.getTipusAnimal());
                    if (partialAnimal.getTipusRaca() != null) animal.setTipusRaca(partialAnimal.getTipusRaca());
                    if (partialAnimal.getEstatSalut() != null) animal.setEstatSalut(partialAnimal.getEstatSalut());
                    if (partialAnimal.getEstatAnimal() != null) animal.setEstatAnimal(partialAnimal.getEstatAnimal());
                    if (partialAnimal.getColor() != null) animal.setColor(partialAnimal.getColor());
                    if (partialAnimal.getEdat() != null) animal.setEdat(partialAnimal.getEdat());
                    if (partialAnimal.getPes() != null) animal.setPes(partialAnimal.getPes());
                    if (partialAnimal.getMida() != null) animal.setMida(partialAnimal.getMida());
                    if (partialAnimal.getSexe() != null) animal.setSexe(partialAnimal.getSexe());
                    if (partialAnimal.getEsterilitzat() != null) animal.setEsterilitzat(partialAnimal.getEsterilitzat());
                    if (partialAnimal.getVacunat() != null) animal.setVacunat(partialAnimal.getVacunat());
                    if (partialAnimal.getXip() != null) animal.setXip(partialAnimal.getXip());
                    if (partialAnimal.getComportament() != null) animal.setComportament(partialAnimal.getComportament());
                    if (partialAnimal.getNecessitats() != null) animal.setNecessitats(partialAnimal.getNecessitats());
                    if (partialAnimal.getFotoUrl() != null) animal.setFotoUrl(partialAnimal.getFotoUrl());
                    if (partialAnimal.getAlt() != null) animal.setAlt(partialAnimal.getAlt());
                    if (partialAnimal.getObservacions() != null) animal.setObservacions(partialAnimal.getObservacions());
                    if (partialAnimal.getRip() != null) animal.setRip(partialAnimal.getRip());
                    return ResponseEntity.ok(animalsRepository.save(animal));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @DeleteMapping("/api/animals/{id}")
    public ResponseEntity<Object> deleteAnimal(@PathVariable Integer id){
        return animalsRepository.findById(id)
                .map(animal -> {
                    animalsRepository.delete(animal);
                    return ResponseEntity.noContent().build();
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


}
