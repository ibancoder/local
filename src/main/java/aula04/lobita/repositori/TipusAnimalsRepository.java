package aula04.lobita.repositori;

import aula04.lobita.models.TipusAnimals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipusAnimalsRepository extends JpaRepository <TipusAnimals, Integer> {

}
