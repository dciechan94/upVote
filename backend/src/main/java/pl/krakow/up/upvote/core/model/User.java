package pl.krakow.up.upvote.core.model;

import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "EV_User")
@Table(indexes ={
        @Index(name = "index-email",  columnList="email", unique = true)
})
public class User implements Persistable {

    @Id
    @GeneratedValue
    protected Long id;

    @NotNull(message = "ERROR_USER_USERNAME_NULL")
    @Size(
            min = 2,
            max = 255,
            message = "ERROR_USER_USERNAME_INVALID_LENGTH"
    )
    protected String userName;

    @NotNull(message = "ERROR_USER_EMAIL_NULL")
    @Email(message = "ERROR_USER_EMAIL_INVALID_FORMAT")
    @Column(name = "email", unique = true)
    protected String email;

    @NotNull(message = "ERROR_USER_PASSWORD_HASH_NULL")
    protected String passwordHash;

    @NotNull(message = "ERROR_USER_FIRST_NAME_NULL")
    @Size(
            min = 2,
            max = 255,
            message = "ERROR_USER_FIRST_NAME_INVALID_LENGTH"
    )
    protected String firstName;

    @NotNull(message = "ERROR_USER_LAST_NAME_NULL")
    @Size(
            min = 2,
            max = 255,
            message = "ERROR_USER_LAST_NAME_INVALID_LENGTH"
    )
    protected String lastName;


    public User() {
    }

    public Long getId() { // Optional but useful
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "Id: " + getId() + ", username: " + getUserName();
    }
}