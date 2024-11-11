package aula04.lobita.repositori;

import aula04.lobita.models.Usuaris;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarisRepository extends JpaRepository<Usuaris, Integer> {

    Optional<Usuaris> findByNomUsuari(String nomUsuari);

    boolean existsByNomUsuari(String nomUsuari);

    boolean existsByEmail(String email);
}
