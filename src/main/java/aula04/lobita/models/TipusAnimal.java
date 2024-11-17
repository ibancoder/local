package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "tipusanimal")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipusAnimal {
    @Id
    @Column(name = "idtipusanimal", nullable = false, length = 2)
    private Integer idTipusAnimal;

    @Column(name = "descripcio", nullable = false)
    private String descricio;

    @OneToMany(mappedBy = "tipusAnimal")
    private List<Animals> animals;


}
