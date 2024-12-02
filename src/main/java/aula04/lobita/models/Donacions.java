package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="donacions")
@Getter
@Setter
public class Donacions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="iddonacio", nullable = false)
    private Integer idDonacio;

    @Column(name = "datadonacio", nullable = false)
    private LocalDate dataDonacio;

    @Column(name = "quantitat")
    private Float quantitat;

    @ManyToOne
    @JoinColumn(name = "idusuari", referencedColumnName = "idusuari", nullable = false)
    private Usuaris usuaris;

    public Donacions() {
        super();
    }

    public Donacions(LocalDate dataDonacio, Float quantitat, Usuaris usuaris) {
        this.dataDonacio = dataDonacio;
        this.quantitat = quantitat;
        this.usuaris = usuaris;
    }
}
