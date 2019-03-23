package pl.krakow.up.upvote.core.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "EV_RegistrationCode")
@Table(indexes ={
        @Index(name = "index-code",  columnList="code", unique = true)
})
public class RegistrationCode implements Persistable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @NotNull
    @Column(name = "code", unique = true)
    protected String code;

    protected Date validUntil;

    public RegistrationCode() {
    }

    public Long getId() { // Optional but useful
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }
}
