package pl.krakow.up.upvote.rest.model;

public class BusinessExceptionModel {
    private String message;

    public BusinessExceptionModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
