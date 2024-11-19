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

    @Column(name = "tipusraca", nullable = false)
    private String tipusRaca;

    // Estats fixes
    @Column(name = "estatsalut", nullable = false)
    private String estatSalut;

    //estat animal es refereix a si esta adoptat o apradinat
    @Column(name = "idestatanimal", nullable = false)
    private Integer idEstatAnimal;

    @Column(name = "dataadopcio", nullable = false)
    private LocalDate dataAdopcio;

    @Column(name = "dataapadrinament", nullable = false)
    private LocalDate dataApadrinament;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "edat", nullable = false)
    private Float edat;

    @Column(name = "mida", nullable = false)
    private String mida;

    @Column(name = "datanaixament", nullable = false)
    private LocalDate dataNaixament;

    @Column(name = "esterilitzat", nullable = false)
    private Boolean esterilitzat;

    @Column(name = "vacunat", nullable = false)
    private Boolean vacunat;

    @Column(name = "xip")
    private String xip;

    @Column(name = "comportament", nullable = false)
    private String Comportament;

    @Column(name = "necessitats", nullable = false)
    private String necessitats;

    @Column(name = "fotorurl", nullable = false)
    private String fotoUrl;

    @Column(name = "observacions", nullable = false)
    private String observacions;

    @Column(name ="rip", nullable = false)
    private Boolean rip;

    //Constructor

    public Animals(String nomAnimal, LocalDate dataEntrada, TipusAnimal tipusAnimal, String tipusRaca, String estatSalut, Integer idEstatAnimal, LocalDate dataAdopcio, LocalDate dataApadrinament, String color, Float edat, String mida, LocalDate dataNaixament, Boolean esterilitzat, Boolean vacunat, String xip, String comportament, String necessitats, String fotoUrl, String observacions) {
        this.nomAnimal = nomAnimal;
        this.dataEntrada = dataEntrada;
        this.tipusAnimal = tipusAnimal;
        this.tipusRaca = tipusRaca;
        this.estatSalut = estatSalut;
        this.idEstatAnimal = idEstatAnimal;
        this.dataAdopcio = dataAdopcio;
        this.dataApadrinament = dataApadrinament;
        this.color = color;
        this.edat = edat;
        this.mida = mida;
        this.dataNaixament = dataNaixament;
        this.esterilitzat = esterilitzat;
        this.vacunat = vacunat;
        this.xip = xip;
        this.Comportament = comportament;
        this.necessitats = necessitats;
        this.fotoUrl = fotoUrl;
        this.observacions = observacions;
    }


}


