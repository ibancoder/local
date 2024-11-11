package aula04.lobita.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tipususuari")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TipusUsuaris {

    @Id
    @Column(name = "idtipususuari", nullable = false, length = 2)
    private String idTipusUsuari;

    @Column(name = "descripció", nullable = false, length = 50)
    private String descripcio;



}
