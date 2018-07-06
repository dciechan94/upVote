package pl.krakow.up.upvote.core.model.exceptions;

public class ServiceRuntimeException extends RuntimeException {

    private String[] errorCodes;
    private String customMessage;

    public ServiceRuntimeException(Exception e) {
        super(e);
    }

    public ServiceRuntimeException(String[] errorCodes) {
        super(String.join(",", errorCodes));
        this.errorCodes = errorCodes;
    }

    public ServiceRuntimeException(String errorCode) {
        super(errorCode);
        this.errorCodes = new String[] {errorCode};
    }

    public ServiceRuntimeException(String[] errorCodes, Exception e) {
        super(String.join(",", errorCodes), e);
        this.errorCodes = errorCodes;
    }

    public ServiceRuntimeException(String errorCode, Exception e) {
        super(errorCode, e);
        this.errorCodes = new String[] {errorCode};
    }

    public ServiceRuntimeException(String[] errorCodes, String customMessage) {
        super(String.join(",", errorCodes));
        this.errorCodes = errorCodes;
        this.customMessage = customMessage;
    }

    public ServiceRuntimeException(String errorCode, String customMessage) {
        super(errorCode);
        this.errorCodes = new String[] {errorCode};
        this.customMessage = customMessage;
    }

    public ServiceRuntimeException(String[] errorCodes, String customMessage, Exception e) {
        super(String.join(",", errorCodes), e);
        this.errorCodes = errorCodes;
        this.customMessage = customMessage;
    }

    public ServiceRuntimeException(String errorCode, String customMessage, Exception e) {
        super(errorCode, e);
        this.errorCodes = new String[] {errorCode};
        this.customMessage = customMessage;
    }

    public String[] getErrorCodes() {
        return errorCodes;
    }

    public void setErrorCodes(String[] errorCodes) {
        this.errorCodes = errorCodes;
    }

    public String getCustomMessage() {
        if(customMessage == null) {
            return super.getMessage();
        }
        return customMessage;
    }

    public void setCustomMessage(String customMessage) {
        this.customMessage = customMessage;
    }
}
