package aula04.lobita.repositori;

import aula04.lobita.models.TipusAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipusAnimalRepository extends JpaRepository <TipusAnimal, Integer> {


}
