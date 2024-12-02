package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tipusanimals")
@Getter
@Setter
@NoArgsConstructor
public class TipusAnimals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idtipusanimal", nullable = false)
    private Integer idTipusAnimal;

    @Column(name = "nomtipusanimal", nullable = false)
    private String nomTipusAnimal;

    @Column(name="foto", nullable = false)
    private String foto;

    @Column(name="alt", nullable = false)
    private String alt;

    public TipusAnimals(String nomTipusAnimal, String foto, String alt){
        super();
        this.nomTipusAnimal = nomTipusAnimal;
        this.foto = foto;
        this.alt = alt;
    }
}
