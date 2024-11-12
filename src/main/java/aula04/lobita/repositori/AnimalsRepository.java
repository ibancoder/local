package aula04.lobita.repositori;

import aula04.lobita.models.Animals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalsRepository extends JpaRepository<Animals, Integer> {

    //Optional<Animals> findByNomAnimal(String nomAnimal);
    boolean existsByNomAnimal(String nomAnimal);


}
