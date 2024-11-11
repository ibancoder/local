package aula04.lobita.repositori;

import aula04.lobita.models.TipusUsuaris;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipusUsuariRepository extends JpaRepository <TipusUsuaris, Integer> {
}
