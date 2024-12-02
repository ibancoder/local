package aula04.lobita.repositori;

import aula04.lobita.models.Animals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnimalsRepository extends JpaRepository<Animals, Integer> {
    /*
    List<Animals> findAnimalsByTipusAnimalIdTipusAnimal(Integer id);

    //Revisar Query
    @Query("SELECT a FROM Animals a INNER JOIN TipusAnimals tp ON tp.idTipusAnimal = a.tipusAnimal.idTipusAnimal WHERE tp.idTipusAnimal = :id")
    List<Animals> findAnimalsUsingQuery(Integer id);

    @Query(nativeQuery = true, value = "SELECT a FROM Animals a INNER JOIN TipusAnimals tp ON tp.idTipusAnimal = a.tipusAnimal.idTipusAnimal WHERE tp.idTipusAnimal = :id")
    List<Animals> findAnimalsUsingQuery2(Integer id);

     */
}
