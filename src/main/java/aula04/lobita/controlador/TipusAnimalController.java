package aula04.lobita.controlador;

import aula04.lobita.models.TipusAnimal;
import aula04.lobita.repositori.TipusAnimalRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class TipusAnimalController {
    TipusAnimalRepository tipusAnimalRepository;

    public TipusAnimalController(TipusAnimalRepository tipusAnimalRepository){
        this.tipusAnimalRepository = tipusAnimalRepository;
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500", "http://localhost:8080"})
    @PostMapping("/api/creartipusanimal")
    public void creartipusanimal(){

        TipusAnimal tipusanimal1 = new TipusAnimal(1,"Gossos","img/gos.jpg","foto de gossos", new ArrayList<>());
        TipusAnimal tipusanimal2 = new TipusAnimal(2,"Gats", "img/gat.jpg", "foto de gats", new ArrayList<>());
        TipusAnimal tipusanimal3 = new TipusAnimal(3,"Ocells", "img/Ocells.jpg", "foto de ocells",new ArrayList<>());
        TipusAnimal tipusanimal4 = new TipusAnimal(4,"Altres", "img/altres.jpg","foto d'altres",new ArrayList<>());

        tipusAnimalRepository.save(tipusanimal1);
        tipusAnimalRepository.save(tipusanimal2);
        tipusAnimalRepository.save(tipusanimal3);
        tipusAnimalRepository.save(tipusanimal4);


    }
}
