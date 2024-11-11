package aula04.lobita.repositori;

import aula04.lobita.models.Noticies;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticiesRepository extends JpaRepository<Noticies, Integer> {
}
