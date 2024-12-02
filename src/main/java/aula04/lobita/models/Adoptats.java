package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="adoptats")
@Getter
@Setter
public class Adoptats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="idrelacio", nullable = false)
    private Integer idRelacio;

    @Column(name="dataalta", nullable = false)
    private LocalDate dataAlta;

    @Column(name ="databaixa")
    private LocalDate dataBaixa;

    @ManyToOne
    @JoinColumn(name="idusuari", referencedColumnName ="idusuari", nullable =false)
    private Usuaris usuaris;

    @ManyToOne
    @JoinColumn(name="idanimal", referencedColumnName ="idanimal", nullable =false)
    private Animals animals;

    public Adoptats(){
        super ();
    }

    public Adoptats(LocalDate dataAlta, Usuaris usuaris, Animals animals){
        super();
        this.dataAlta = dataAlta;
        this.usuaris = usuaris;
        this.animals = animals;
    }
}
