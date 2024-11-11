package aula04.lobita.service;

import aula04.lobita.models.Usuaris;
import aula04.lobita.repositori.UsuarisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuariService {
    @Autowired
    private UsuarisRepository usuarisRepository;

    public Usuaris registrarUsuari(Usuaris usuaris) throws Exception{
        if (usuarisRepository.existsByEmail(usuaris.getEmail())) {
            throw new Exception("El email ja està registrat. Inserta un nou email");
        }
        if(usuarisRepository.existsByNomUsuari(usuaris.getNomUsuari())){
            throw new Exception("El nom de l'usuari ja està registrat, inserta un altre.");
        }
        usuaris.setPassword(new BCryptPasswordEncoder().encode(usuaris.getPassword()));
        return usuarisRepository.save(usuaris);
    }

}
