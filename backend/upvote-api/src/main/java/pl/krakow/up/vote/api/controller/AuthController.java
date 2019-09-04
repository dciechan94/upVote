package pl.krakow.up.vote.api.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.converter.Converter;
import pl.krakow.up.vote.api.util.APIUtils;
import pl.krakow.up.vote.model.User;
import pl.krakow.up.vote.repository.UserRepository;

import java.security.Principal;
import java.util.Optional;

@Slf4j
@RestController
@Api(value = "Authentication resource")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Converter converter;

    @GetMapping(produces = "application/json", path = "/login")
    @ApiOperation(value = "Retrieve principal details", response = UserDTO.class)
    @ResponseBody
    public ResponseEntity login(Principal principal) {
        log.debug("GET /login, principal={}", principal.getName());

        Optional<User> user = userRepository.findByLogin(principal.getName());
        if(!user.isPresent()) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find user");
        }
        return ResponseEntity.ok().body(converter.toApiObject(user.get()));
    }
}
