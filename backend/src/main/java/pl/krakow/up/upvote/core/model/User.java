package pl.krakow.up.upvote.core.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User {

    @Id
    @GeneratedValue
    protected Long id;

    @NotNull
    @Size(
            min = 2,
            max = 255,
            message = "Username is required, minimum 2, maximum 255 characters."
    )
    protected String userName;

    @NotNull
    @Size(
            min = 2,
            max = 255,
            message = "Email is required, minimum 2, maximum 255 characters."
    )
    protected String email;

    @NotNull
    @Size(
            min = 32,
            max = 255,
            message = "PasswordHash is required, minimum 2, maximum 255 characters."
    )
    protected String passwordHash;

    @NotNull
    @Size(
            min = 2,
            max = 255,
            message = "First name is required, minimum 2, maximum 255 characters."
    )
    protected String firstName;

    @NotNull
    @Size(
            min = 2,
            max = 255,
            message = "Last name is required, minimum 2, maximum 255 characters."
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
