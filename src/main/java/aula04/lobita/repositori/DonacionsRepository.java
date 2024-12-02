package aula04.lobita.repositori;

import aula04.lobita.models.Donacions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonacionsRepository extends JpaRepository <Donacions, Integer> {
}
