package pl.krakow.up.upvote.rest.v1.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VoteableDTO {
    private Long id;
    private String value;
    private UserDTO userReference;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public UserDTO getUserReference() {
        return userReference;
    }

    public void setUserReference(UserDTO userReference) {
        this.userReference = userReference;
    }
}
