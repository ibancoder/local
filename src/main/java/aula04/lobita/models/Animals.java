package aula04.lobita.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name  ="Animals")
@Getter
@Setter
public class Animals {

    @Id
    @Column(name = "idanimal", nullable = false)
    private Integer idAnimal;

    @Column(name ="nomanimal", nullable = false)
    private String nomAnimal;

    @Column(name = "dataentrada", nullable = false)
    private LocalDate dataEntrada;

    @Column(name = "idtipusanimal", nullable = false)
    private Integer idTipusAnimal;

    @Column(name = "idtipusraca", nullable = false)
    private Integer idTipusRaca;

    @Column(name = "idestatsalut", nullable = false)
    private Integer idEstatSalut;

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

    @Column(name = "xip", nullable = false)
    private String xip;

    @Column(name = "idcomportament", nullable = false)
    private Integer idComportament;

    @Column(name = "necessitats", nullable = false)
    private String necessitats;

    @Column(name = "fotorurl", nullable = false)
    private String fotoUrl;

    @Column(name = "observacions", nullable = false)
    private String Observacions;

    //Constructor

    public Animals() {
        super();
    }

    public Animals(String nomAnimal, LocalDate dataEntrada, Integer idTipusAnimal, Integer idTipusRaca, Integer idEstatSalut, Integer idEstatAnimal, LocalDate dataAdopcio, LocalDate dataApadrinament, String color, Float edat, String mida, LocalDate dataNaixament, Boolean esterilitzat, Boolean vacunat, String xip, Integer idComportament, String necessitats, String fotoUrl, String observacions) {
        this.nomAnimal = nomAnimal;
        this.dataEntrada = dataEntrada;
        this.idTipusAnimal = idTipusAnimal;
        this.idTipusRaca = idTipusRaca;
        this.idEstatSalut = idEstatSalut;
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
        this.idComportament = idComportament;
        this.necessitats = necessitats;
        this.fotoUrl = fotoUrl;
        Observacions = observacions;
    }


}


