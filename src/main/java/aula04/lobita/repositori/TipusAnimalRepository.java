package aula04.lobita.repositori;

import aula04.lobita.models.TipusAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipusAnimalRepository extends JpaRepository <TipusAnimal, Integer> {


}
