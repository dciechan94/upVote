package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.upvote.core.model.User;
import pl.krakow.up.upvote.core.model.exceptions.ServiceRuntimeException;
import pl.krakow.up.upvote.rest.util.APIUtils;
import pl.krakow.up.upvote.rest.v1.model.dto.UserDTO;
import pl.krakow.up.upvote.rest.v1.model.util.Mappers;
import pl.krakow.up.upvote.services.PermissionService;
import pl.krakow.up.upvote.services.UserManagementService;

import java.security.Principal;


@Controller
@RequestMapping(value = "/users")
public class UserController {

    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

    @Autowired
    private UserManagementService userService;

    @Autowired
    private PermissionService permissionService;


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createUser(
            @RequestBody UserDTO userDto, Principal principal) {
        LOGGER.debug("POST /users body={}", userDto);

        if(!permissionService.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        User user = Mappers.USER_FROM_DTO_MAPPER(userDto);

        try {
            Long id = userService.createUser(user, userDto.getRegistrationCode());
            return ResponseEntity.ok().body(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to create user: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot create user", e.getErrorCodes());
        }
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity deleteUser(
            @PathVariable(name = "id", required = true) Long id, Principal principal) {
        LOGGER.debug("DELETE /users/{}", id);

        if(!permissionService.hasAdministratorRole(principal)) {
            User currentUser = userService.findUser(principal.getName());
            if(currentUser == null || currentUser.getId() != id) {
                return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
            }
        }

        try {
            userService.deleteUser(id);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to delete user: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot delete user", e.getErrorCodes());
        }
        return ResponseEntity.ok().body(null);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity updateUser(
            @PathVariable(name = "id", required = false) Long id,
            @RequestBody UserDTO userDto,
            Principal principal) {
        LOGGER.debug("PUT /users/{} body={}", id, userDto);

        if(!permissionService.hasAdministratorRole(principal)) {
            User currentUser = userService.findUser(principal.getName());
            if(currentUser == null || currentUser.getId() != id) {
                return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
            }
        }

        try {
            User updatedUserData = Mappers.USER_FROM_DTO_MAPPER(userDto);
            userService.updateUser(id, updatedUserData);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to update user: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot update user", e.getErrorCodes());
        }

        return ResponseEntity.ok().body(null);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getUser(
            @PathVariable(name = "id", required = true) Long id,
            Principal principal) {
        LOGGER.debug("GET /users/{}", id);

        if(!permissionService.hasAdministratorRole(principal)) {
            User currentUser = userService.findUser(principal.getName());
            if(currentUser == null || currentUser.getId() != id) {
                return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
            }
        }

        UserDTO userDto = null;

        try {
            User foundUser = userService.findUser(id);
            userDto = Mappers.USER_TO_DTO_MAPPER(foundUser);
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to find user: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find user", e.getErrorCodes());
        }

        return ResponseEntity.ok().body(userDto);
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity login(Principal principal) {
        LOGGER.debug("POST /login");

        try {
            User foundUser = userService.findUser(principal.getName());
            if(foundUser == null) {
                return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find user");
            }
            return ResponseEntity.ok().body(Mappers.USER_TO_DTO_MAPPER(foundUser));
        } catch (ServiceRuntimeException e) {
            LOGGER.error("Failed to find user: {}", e.getCustomMessage(), e);
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find user", e.getErrorCodes());
        }
    }
}
