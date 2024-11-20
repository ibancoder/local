package aula04.lobita.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name  ="Animals")
@Getter
@Setter
@NoArgsConstructor
public class Animals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idanimal", nullable = false)
    private Integer idAnimal;

    @Column(name ="nomanimal", nullable = false)
    private String nomAnimal;

    @Column(name = "dataentrada", nullable = false)
    private LocalDate dataEntrada;

    @ManyToOne
    @JoinColumn(name = "idtipusanimal", referencedColumnName = "idtipusanimal", nullable = false)
    private TipusAnimal tipusAnimal;

    @Column(name = "tipusraca", nullable = true)
    private String tipusRaca;

    // Estats fixes
    @Column(name = "estatsalut", nullable = false)
    private String estatSalut;

    //estat animal es refereix a si esta adoptat o apradinat
    @Column(name = "estatanimal", nullable = false)
    private Integer estatAnimal;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "edat", nullable = false)
    private Float edat;

    @Column(name="pes", nullable = false)
    private Float pes;

    @Column(name = "mida", nullable = false)
    private String mida;

    @Column(name="sexe")
    private String sexe;

    @Column(name = "esterilitzat", nullable = false)
    private Boolean esterilitzat;

    @Column(name = "vacunat", nullable = false)
    private Boolean vacunat;

    @Column(name = "xip")
    private String xip;

    @Column(name = "comportament", nullable = false)
    private String comportament;

    @Column(name = "necessitats", nullable = false)
    private String necessitats;

    @Column(name = "fotourl", nullable = false)
    private String fotoUrl;

    @Column(name = "alt", nullable = false)
    private String alt;

    @Column(name = "observacions", nullable = false)
    private String observacions;

    @Column(name ="rip", nullable = false)
    private Boolean rip;

    //Constructor


    public Animals(String nomAnimal, LocalDate dataEntrada, TipusAnimal tipusAnimal, String tipusRaca, String estatSalut, Integer estatAnimal, String color, Float edat, Float pes, String mida, String sexe, Boolean esterilitzat, Boolean vacunat, String xip, String comportament, String necessitats, String fotoUrl, String alt, String observacions, Boolean rip) {
        this.nomAnimal = nomAnimal;
        this.dataEntrada = dataEntrada;
        this.tipusAnimal = tipusAnimal;
        this.tipusRaca = tipusRaca;
        this.estatSalut = estatSalut;
        this.estatAnimal = estatAnimal;
        this.color = color;
        this.edat = edat;
        this.pes = pes;
        this.mida = mida;
        this.sexe = sexe;
        this.esterilitzat = esterilitzat;
        this.vacunat = vacunat;
        this.xip = xip;
        this.comportament = comportament;
        this.necessitats = necessitats;
        this.fotoUrl = fotoUrl;
        this.alt = alt;
        this.observacions = observacions;
        this.rip = rip;
    }

}


