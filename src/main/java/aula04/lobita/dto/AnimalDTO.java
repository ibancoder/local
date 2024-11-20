package aula04.lobita.dto;

import aula04.lobita.models.Animals;
import aula04.lobita.models.TipusAnimal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor

public class AnimalDTO {
    private Integer idAnimal;
    private String nomAnimal;
    private LocalDate dataEntrada;
    private String tipusAnimal;
    private String tipusRaca;
    private String estatSalut;
    private Integer estatAnimal;
    private String color;
    private Float edat;
    private Float pes;
    private String mida;
    private String sexe;
    private Boolean esterilitzat;
    private Boolean vacunat;
    private String xip;
    private String comportament;
    private String necessitats;
    private String fotoUrl;
    private String alt;
    private String observacions;
    private Boolean rip;

    public AnimalDTO(Animals animal) {
        this.idAnimal = animal.getIdAnimal();
        this.nomAnimal = animal.getNomAnimal();
        this.dataEntrada = animal.getDataEntrada();
        this.tipusAnimal = animal.getTipusAnimal() != null ? animal.getTipusAnimal().getNomtipusanimal(): null ;
        this.tipusRaca = animal.getTipusRaca();
        this.estatSalut = animal.getEstatSalut();
        this.estatAnimal = animal.getEstatAnimal();
        this.color = animal.getColor();
        this.edat = animal.getEdat();
        this.mida = animal.getMida();
        this.sexe = animal.getSexe();
        this.esterilitzat = animal.getEsterilitzat();
        this.vacunat = animal.getVacunat();
        this.xip = animal.getXip();
        this.comportament = animal.getComportament();
        this.fotoUrl = animal.getFotoUrl();
        this.alt = animal.getAlt();
        this.observacions = animal.getObservacions();
        this.rip = animal.getRip();
    }
}
