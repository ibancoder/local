package aula04.lobita.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name ="usuarisanimals")
@Getter
@Setter
@NoArgsConstructor

public class UsuarisAnimals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idrelacio")
    private Integer idrelacio;

    @Column(name ="idusuari", nullable = false)
    private Integer idusuari;

    @Column(name ="idanimal")
    private Integer idanimal;

    @Column(name ="adopcio")
    private Boolean adopcio;

    @Column(name ="apadrinat")
    private Boolean apadrinat;

    @Column(name="economica")
    private Boolean economica;

    @Column(name="data")
    private LocalDate data;

    @Column(name="datafinal")
    private LocalDate datafinal;

    @Column(name="quotamensual")
    private Float quotamensual;

    @Column(name="condicions")
    private String condicions;

    @Column(name="contractesignat")
    private Boolean contracte;

    @Column(name="observacions")
    private String observacions;

    //Constructor sense ID autogenerat

    public UsuarisAnimals(Integer idusuari, Integer idanimal, Boolean adopcio, Boolean apadrinat, Boolean economica, LocalDate data, LocalDate datafinal, Float quotamensual, String condicions, Boolean contracte, String observacions) {
        this.idusuari = idusuari;
        this.idanimal = idanimal;
        this.adopcio = adopcio;
        this.apadrinat = apadrinat;
        this.economica = economica;
        this.data = data;
        this.datafinal = datafinal;
        this.quotamensual = quotamensual;
        this.condicions = condicions;
        this.contracte = contracte;
        this.observacions = observacions;
    }
}
