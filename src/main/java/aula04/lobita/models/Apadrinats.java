package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="apadrinats")
@Getter
@Setter

public class Apadrinats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="idrelacio", nullable = false)
    private Integer idRelacio;

    @Column(name = "dataalta", nullable = false)
    private LocalDate dataAlta;

    @Column(name = "databaixa")
    private LocalDate dataBaixa;

    @Column(name = "quotamensual", nullable = false)
    private Float quotaMensual;

    @ManyToOne
    @JoinColumn(name = "idusuari", referencedColumnName = "idusuari", nullable = false)
    private Usuaris usuaris;

    @ManyToOne
    @JoinColumn(name = "idanimal", referencedColumnName = "idanimal", nullable = false)
    private Animals animals;

    public Apadrinats(){
        super();
    }

    public Apadrinats(LocalDate dataAlta, Float quotaMensual, Usuaris usuaris, Animals animals) {
        this.dataAlta = dataAlta;
        this.quotaMensual = quotaMensual;
        this.usuaris = usuaris;
        this.animals = animals;
    }
}
