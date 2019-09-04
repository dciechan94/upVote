package pl.krakow.up.vote.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@EqualsAndHashCode(callSuper=true)
@Table(name = "REGISTRATION_CODE")
public class RegistrationCode extends AbstractObject {

    @Column(unique = true)
    private String code;

    private int validDays;
}
