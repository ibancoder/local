package aula04.lobita.dto;

import aula04.lobita.models.Animals;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AnimalDTO {
    private String nomAnimal;
    private LocalDate dataEntrada;
    private String tipusAnimal;
    private String tipusRaca;
    private String color;
    private Float edat;
    private String mida;
    private Boolean esterilitzat;
    private Boolean vacunat;
    private String fotoUrl;
    private String observacions;

    //public AnimalDTO(Animals animal){
    //    this.nomAnimal = animal.getNomAnimal();
    //    this.color = animal.getColor();
    //    this.tipusAnimal = animal.getTipusAnimal().getNomtipusanimal();
    //}
    public AnimalDTO(Animals animal) {
        this.nomAnimal = animal.getNomAnimal();
        this.dataEntrada = animal.getDataEntrada();
        this.tipusAnimal = animal.getTipusAnimal() != null ? animal.getTipusAnimal().getNomtipusanimal() : null;
        this.tipusRaca = animal.getTipusRaca();
        this.color = animal.getColor();
        this.edat = animal.getEdat();
        this.mida = animal.getMida();
        this.esterilitzat = animal.getEsterilitzat();
        this.vacunat = animal.getVacunat();
        this.fotoUrl = animal.getFotoUrl();
        this.observacions = animal.getObservacions();
    }
}
