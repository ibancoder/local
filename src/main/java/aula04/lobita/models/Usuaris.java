package aula04.lobita.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name ="Usuaris")
@Getter
@Setter
public class Usuaris {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idusuari", nullable = false)
    private Integer idUsuari;

    @Column(name = "nom", nullable = false, length = 30)
    private String nom;

    @Column(name = "cognoms", nullable = false, length = 100)
    private String cognoms;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "telefon", nullable = false, length = 9)
    private String telefon;

    @Column(name = "foto")
    private String foto;

    @Column(name = "nomUsuari", nullable = false, length = 30)
    private String nomUsuari;

    @Column(name = "password", nullable = false, length = 255) //canvi per password encriptat
    private String password;

    @Column(name = "dataalta", updatable = false) //Nomes es crea, no es modifica en actualitzacions
    private LocalDate dataAlta;

    @Column(name = "actiu", nullable = true)
    private Boolean actiu;

    public Usuaris() {
        super();
    }

    public Usuaris(String nom, String cognoms, String email, String telefon, String nomUsuari, String password, LocalDate dataAlta, Boolean actiu, String foto) {
        super();
        this.nom = nom;
        this.cognoms = cognoms;
        this.email = email;
        this.telefon = telefon;
        this.nomUsuari = nomUsuari;
        this.password = password;
        this.dataAlta = LocalDate.now();
        this.actiu = actiu;
        this.foto= foto;
    }

    public Integer getIdUsuari() { return idUsuari; }

    public void setIdUsuari(Integer idUsuari) { this.idUsuari = idUsuari; }

    public String getNom() { return nom; }

    public void setNom(String nom) { this.nom = nom; }

    public String getCognoms() { return cognoms; }

    public void setCognoms(String cognoms) { this.cognoms = cognoms; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getTelefon() { return telefon; }

    public void setTelefon(String telefon) { this.telefon = telefon; }

    public String getFoto() { return foto; }

    public void setFoto(String foto) { this.foto = foto; }

    public String getNomUsuari() { return nomUsuari; }

    public void setNomUsuari(String nomUsuari) { this.nomUsuari = nomUsuari; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public LocalDate getDataAlta() { return dataAlta; }

    public void setDataAlta(LocalDate dataAlta) { this.dataAlta = dataAlta; }

    public Boolean getActiu() { return actiu; }

    public void setActiu(Boolean actiu) { this.actiu = actiu; }
}