package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;
import pl.krakow.up.upvote.rest.v1.model.dto.UserDTO;
import pl.krakow.up.upvote.rest.v1.model.util.Mappers;
import pl.krakow.up.upvote.services.UserManagementService;
import pl.krakow.up.upvote.services.util.ValuesMapper;

import java.util.LinkedHashMap;
import java.util.Map;


@Controller
@RequestMapping(value = "/users")
public class UserController {

    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

    @Autowired
    private UserManagementService userService;


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createUser(
            @RequestBody UserDTO userDto) {
        LOGGER.debug("POST /users body={}", userDto);

        User user = Mappers.USER_TO_DTO_MAPPER(userDto);

        try {
            Long id = userService.createUser(user);
            return ResponseEntity.ok().body(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to create user: {}", e.getCustomMessage(), e);
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot create user", e.getErrorCodes());
        }

    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity deleteUser(
            @PathVariable(name = "id", required = true) Long id) {
        try {
            userService.deleteUser(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to delete user: {}", e.getCustomMessage(), e);
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot delete user", e.getErrorCodes());
        }
        return ResponseEntity.ok().body(null);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity updateUser(
            @PathVariable(name = "id", required = false) Long id,
            @RequestBody UserDTO userDto) {

        try {
            User updatedUserData = Mappers.USER_TO_DTO_MAPPER(userDto);
            userService.updateUser(id, updatedUserData);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to update user: {}", e.getCustomMessage(), e);
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot update user", e.getErrorCodes());
        }

        return ResponseEntity.ok().body(null);
    }

    private static ResponseEntity createErrorResponse(HttpStatus status, String message) {
        return createErrorResponse(status, message, null);
    }

    private static ResponseEntity createErrorResponse(HttpStatus status, String message, Object details) {
        Map<String, Object> entity = new LinkedHashMap<>();
        entity.put("message", message);
        entity.put("code", status.value());
        if(details!=null) {
            entity.put("details", details);
        }
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_JSON).body(entity);
    }
}
