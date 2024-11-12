package aula04.lobita.controlador;

import aula04.lobita.models.Animals;
import aula04.lobita.repositori.AnimalsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class AnimalsController {

    private final AnimalsRepository animalsRepository;
    private final LocalDate dataActual = LocalDate.now();
    private static final Logger logger = LoggerFactory.getLogger(AnimalsController.class);

    /**
     * Rest Controller to handle Animals on App.
     * @param animalsRepository Repository to access to Animals.
     */
    public AnimalsController(AnimalsRepository animalsRepository) { this.animalsRepository = animalsRepository; }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500"})
    @GetMapping("/api/crearanimals")
    public void crearAnimals(){
        Animals animal1 = new Animals("Paris",dataActual, 1,1,1,1,dataActual,dataActual,"blanc",11F,"40cm",dataActual,true,true,"9032482038",1,"Cap necessitat","/imatges/perfilCaball.jpeg","Cap observacio");
        Animals animal2 = new Animals("Triana",dataActual, 1,1,1,1,dataActual,dataActual,"negre",9F,"40cm",dataActual,true,true,"9032482038",1,"Cap necessitat","/imatges/perfilCaball.jpeg","Cap observacio");
        animalsRepository.save(animal1);
        animalsRepository.save(animal2);
    }

}
