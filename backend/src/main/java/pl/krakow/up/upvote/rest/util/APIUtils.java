package pl.krakow.up.upvote.rest.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.Map;

public class APIUtils {


    public static ResponseEntity createErrorResponse(HttpStatus status, String message, Object details) {
        Map<String, Object> entity = new LinkedHashMap<>();
        entity.put("message", message);
        entity.put("code", status.value());
        if(details!=null) {
            entity.put("details", details);
        }
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(entity);
    }

    public static ResponseEntity createErrorResponse(HttpStatus status, String message) {
        return createErrorResponse(status, message, null);
    }
}
