package aula04.lobita.repositori;

import aula04.lobita.models.Adoptats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptatsRepository extends JpaRepository <Adoptats, Integer> {

}
