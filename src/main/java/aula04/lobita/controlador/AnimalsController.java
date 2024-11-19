package aula04.lobita.controlador;

import aula04.lobita.models.Animals;
import aula04.lobita.models.TipusAnimal;
import aula04.lobita.repositori.AnimalsRepository;
import aula04.lobita.repositori.TipusAnimalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
        Animals animal1 = new Animals(
                "Paris",
                dataActual,
                tipusAnimal,
                "Caniche",
                1,
                1,
                dataActual,
                dataActual,
                "blanc",
                11F,
                "40cm",
                dataActual,
                true,
                true,
                "xsdsfkl",
                "tranquil",
                "cap necessitat",
                "/imatges/perfilCaball.jpeg",
                "cap observacio");
        //Animals animal1 = new Animals("Paris",dataActual,1,1,1,dataActual,dataActual,"blanc",11F,"40cm",dataActual,true,true,"9032482038","1","Cap necessitat","/imatges/perfilCaball.jpeg","Cap observacio");
        //Animals animal2 = new Animals("Triana",dataActual, "1",1,1,dataActual,dataActual,"negre",9F,"40cm",dataActual,true,true,"9032482038","1","Cap necessitat","/imatges/perfilCaball.jpeg","Cap observacio");
        animalsRepository.save(animal1);
        //animalsRepository.save(animal2);
    }
    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/animals")
    public List<Animals> getAllAnimals(){
        return animalsRepository.findAll();
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/animals/{id}")
    public ResponseEntity<Animals> getAnimalById(@PathVariable Integer id){
        Optional<Animals> animal = animalsRepository.findById(id);
        return animal.map(ResponseEntity::ok).orElseGet(() -> (ResponseEntity<Animals>) ResponseEntity.notFound());
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PostMapping("/api/animals")
    public Animals createAnimal(@RequestBody Animals animal){
        return animalsRepository.save(animal);
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @PutMapping("/api/animals/{id}")
    public ResponseEntity<Animals> updateAnimal(@PathVariable Integer id, @RequestBody Animals updatedAnimal){
        return animalsRepository.findById(id)
                .map(animal -> {
                    animal.setNomAnimal(updatedAnimal.getNomAnimal());
                    animal.setDataEntrada(updatedAnimal.getDataEntrada());
                    animal.setTipusAnimal(updatedAnimal.getTipusAnimal());
                    animal.setTipusRaca(updatedAnimal.getTipusRaca());
                    animal.setIdEstatSalut(updatedAnimal.getIdEstatSalut());
                    animal.setIdEstatAnimal(updatedAnimal.getIdEstatAnimal());
                    animal.setDataAdopcio(updatedAnimal.getDataAdopcio());
                    animal.setDataApadrinament(updatedAnimal.getDataApadrinament());
                    animal.setColor(updatedAnimal.getColor());
                    animal.setEdat(updatedAnimal.getEdat());
                    animal.setMida(updatedAnimal.getMida());
                    animal.setDataNaixament(updatedAnimal.getDataNaixament());
                    animal.setEsterilitzat(updatedAnimal.getEsterilitzat());
                    animal.setVacunat(updatedAnimal.getVacunat());
                    animal.setXip(updatedAnimal.getXip());
                    animal.setComportament(updatedAnimal.getComportament());
                    animal.setNecessitats(updatedAnimal.getNecessitats());
                    animal.setFotoUrl(updatedAnimal.getFotoUrl());
                    animal.setObservacions(updatedAnimal.getObservacions());
                    return ResponseEntity.ok(animalsRepository.save(animal));
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
                    if (partialAnimal.getIdEstatSalut() != null) animal.setIdEstatSalut(partialAnimal.getIdEstatSalut());
                    if (partialAnimal.getIdEstatAnimal() != null) animal.setIdEstatAnimal(partialAnimal.getIdEstatAnimal());
                    if (partialAnimal.getDataAdopcio() != null) animal.setDataAdopcio(partialAnimal.getDataAdopcio());
                    if (partialAnimal.getDataApadrinament() != null) animal.setDataApadrinament(partialAnimal.getDataApadrinament());
                    if (partialAnimal.getColor() != null) animal.setColor(partialAnimal.getColor());
                    if (partialAnimal.getEdat() != null) animal.setEdat(partialAnimal.getEdat());
                    if (partialAnimal.getMida() != null) animal.setMida(partialAnimal.getMida());
                    if (partialAnimal.getDataNaixament() != null) animal.setDataNaixament(partialAnimal.getDataNaixament());
                    if (partialAnimal.getEsterilitzat() != null) animal.setEsterilitzat(partialAnimal.getEsterilitzat());
                    if (partialAnimal.getVacunat() != null) animal.setVacunat(partialAnimal.getVacunat());
                    if (partialAnimal.getXip() != null) animal.setXip(partialAnimal.getXip());
                    if (partialAnimal.getComportament() != null) animal.setComportament(partialAnimal.getComportament());
                    if (partialAnimal.getNecessitats() != null) animal.setNecessitats(partialAnimal.getNecessitats());
                    if (partialAnimal.getFotoUrl() != null) animal.setFotoUrl(partialAnimal.getFotoUrl());
                    if (partialAnimal.getObservacions() != null) animal.setObservacions(partialAnimal.getObservacions());
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
