package aula04.lobita.repositori;

import aula04.lobita.models.Apadrinats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApadrinatsRepository extends JpaRepository <Apadrinats, Integer> {
}
