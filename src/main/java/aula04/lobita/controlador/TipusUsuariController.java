package aula04.lobita.controlador;

import aula04.lobita.models.TipusUsuaris;
import aula04.lobita.repositori.TipusUsuariRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TipusUsuariController {

    TipusUsuariRepository tipusUsuariRepository;



    public TipusUsuariController(TipusUsuariRepository tipusUsuariRepository){
        this.tipusUsuariRepository = tipusUsuariRepository;
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500", "http://localhost:8080"})
    @PostMapping("/api/crearTipusUsuari")


    public void crearTipusUsuari(){
        TipusUsuaris tipusUsuari1 = new TipusUsuaris("1","soci");
        TipusUsuaris tipusUsuari2 = new TipusUsuaris("2","usuari");
        tipusUsuariRepository.save(tipusUsuari1);
        tipusUsuariRepository.save(tipusUsuari2);
    }

    @CrossOrigin(origins = {"http://localhost:1234", "http://178.156.55.174:8085", "http://localhost:5500", "http://localhost:8080"})
    @PostMapping("api/crearUsuari")
    public ResponseEntity<TipusUsuaris> guardarTipusUsuari(
            @RequestParam("idtipusuari") String idtipususuari,
            @RequestParam("descripcio") String descripcio){

        TipusUsuaris tipusUsuaris = new TipusUsuaris(idtipususuari, descripcio);
        tipusUsuariRepository.save(tipusUsuaris);
        return ResponseEntity.status(HttpStatus.CREATED).body(tipusUsuaris);

    }



}

