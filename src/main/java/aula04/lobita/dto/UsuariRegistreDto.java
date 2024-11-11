package aula04.lobita.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
public class UsuariRegistreDto {
    private String nom;
    private String cognoms;
    private String email;
    private String telefon;
    private LocalDate dataalta;
    private String nomusuari;
    private String password;

}
