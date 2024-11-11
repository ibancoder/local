package aula04.lobita.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "Noticies")
@Getter
@Setter
public class Noticies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idnoticia", nullable = false)
    private Integer idNoticia;

    @Column(name = "datanoticia", nullable = false)
    private LocalDate dataNoticia;

    @Column(name = "Titol", nullable = false, length = 26)
    private String titol;

    @Column(name = "Descripcio", nullable = false, length = 300)
    private String descripcio;

    @Column(name = "foto", nullable = false)
    private String foto;

    @Column(name = "alt", nullable = false, length = 30)
    private String alt;

    @Column(name = "urlnoticia", nullable = false, length = 100)
    private String urlNoticia;

    @Column(name = "nomboto", nullable = false, length = 30)
    private String nomBoto;

    @Column(name = "activa", nullable = false)
    private boolean activa;

    public Noticies() {
        super();
    }

    public Noticies(LocalDate dataNoticia, String titol, String descripcio, String foto, String alt, String urlNoticia, String nomBoto, boolean activa) {
        super();
        this.dataNoticia = dataNoticia;
        this.titol = titol;
        this.descripcio = descripcio;
        this.foto = foto;
        this.alt = alt;
        this.urlNoticia = urlNoticia;
        this.nomBoto = nomBoto;
        this.activa = activa;
    }

    public Integer getIdNoticia() {
        return idNoticia;
    }

    public void setIdNoticia(Integer idNoticia) { this.idNoticia = idNoticia; }

    public LocalDate getDataNoticia() {
        return dataNoticia;
    }

    public void setDataNoticia(LocalDate dataNoticia) {
        this.dataNoticia = dataNoticia;
    }

    public String getTitol() {
        return titol;
    }

    public void setTitol(String titol) {
        this.titol = titol;
    }

    public String getDescripcio() {
        return descripcio;
    }

    public void setDescripcio(String descripcio) {
        this.descripcio = descripcio;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getUrlNoticia() {
        return urlNoticia;
    }

    public void setUrlNoticia(String urlNoticia) {
        this.urlNoticia = urlNoticia;
    }

    public String getNomBoto() {
        return nomBoto;
    }

    public void setNomBoto(String nomBoto) {
        this.nomBoto = nomBoto;
    }

    public boolean isActiva() {
        return activa;
    }

    public void setActiva(boolean activa) {
        this.activa = activa;
    }
}