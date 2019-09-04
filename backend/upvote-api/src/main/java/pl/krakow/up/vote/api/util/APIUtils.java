package pl.krakow.up.vote.api.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class APIUtils {

    public static ResponseEntity createErrorResponse(HttpStatus status, String message, Object details) {
        Map<String, Object> entity = new LinkedHashMap<>();
        entity.put("message", message);
        entity.put("code", status.value());
        if (details != null) {
            entity.put("details", details);
        }
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(entity);
    }

    public static ResponseEntity createErrorResponse(HttpStatus status, String message) {
        return createErrorResponse(status, message, null);
    }
}
