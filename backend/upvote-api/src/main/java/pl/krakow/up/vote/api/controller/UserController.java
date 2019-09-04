package pl.krakow.up.vote.api.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.converter.Converter;
import pl.krakow.up.vote.api.util.APIAuthorizationUtils;
import pl.krakow.up.vote.api.util.APIUtils;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.service.RegistrationCodeService;
import pl.krakow.up.vote.service.UserService;

@Slf4j
@RestController
@RequestMapping("/users")
@Api(value = "Users resource management")
public class UserController {

    @Autowired
    private Converter converter;

    @Autowired
    private APIAuthorizationUtils authUtils;

    @Autowired
    private UserService userService;

    @Autowired
    private RegistrationCodeService codeService;


    @GetMapping(value = "/{id}", produces = "application/json")
    @ApiOperation(value = "Retrieve user by id", response = UserDTO.class)
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id, Principal principal) {

        if(!authUtils.hasAdministratorRole(principal)) {
            User currentUser = userService.findByEmail(principal.getName());
            if(currentUser == null || currentUser.getId().equals(id)) {
                return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
            }
        }

        User user = userService.findById(id);
        if (user == null) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find user");
        }

        return ResponseEntity.ok(converter.toApiObject(user));
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ApiOperation(value = "Create a new user")
    public ResponseEntity<Long> createUser(@RequestBody UserDTO userDto, @RequestParam("code") String code, Principal principal,
           Errors errors) {
        log.debug("POST /users?code={}, body={}", code, userDto);

        Optional<RegistrationCode> codeOpt = codeService.findByCode(code);
        if (!codeOpt.isPresent() && !authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Users can be created only " +
                    "by administrator users or by providing valid registration code.");
        }

        Long userId = userService.create(converter.toModelObject(userDto), codeOpt.get());
        codeService.deleteById(codeOpt.get().getId());

        return ResponseEntity.ok(userId);
    }

    @PutMapping(value = "/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Long> editUser(@PathVariable Long id, @RequestBody UserDTO userDto, Principal principal) {
        log.debug("PUT /users/{}, body={}", id, userDto);

        if(!authUtils.hasAdministratorRole(principal)) {
            User currentUser = userService.findByEmail(principal.getName());
            if(currentUser == null || currentUser.getId().equals(id)) {
                return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
            }
        }
        userDto.setId(id);
        userDto.setModifier(principal.getName());
        userDto.setModified(new Date());
        Long userId = userService.edit(converter.toModelObject(userDto));

        return ResponseEntity.ok(userId);
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Delete user by id")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        log.debug("DELETE /users/{}", id);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        try {
            userService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
        }
    }

    @GetMapping(produces = "application/json")
    @ApiOperation(value = "Retrieve all users in pages", response = UserDTO.class)
    public ResponseEntity<List<UserDTO>> getUsers(Principal principal) {
        List<UserDTO> usersDto = new ArrayList<>();

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        userService.findAll().forEach(user -> usersDto.add(converter.toApiObject(user)));

        return ResponseEntity.ok(usersDto);
    }
}
