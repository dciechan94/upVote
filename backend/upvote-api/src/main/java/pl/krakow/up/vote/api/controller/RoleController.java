package pl.krakow.up.vote.api.controller;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.vote.api.model.RoleDTO;
import pl.krakow.up.vote.api.model.converter.Converter;
import pl.krakow.up.vote.api.reflections.AnnotatedClass;
import pl.krakow.up.vote.api.reflections.ReflectionManager;
import pl.krakow.up.vote.model.Role;
import pl.krakow.up.vote.repository.RoleRepository;

import javax.validation.Valid;
import java.lang.reflect.Field;
import java.util.Optional;

@RestController
@RequestMapping("/v1/role")
@Api(value = "CRUD for role type")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ReflectionManager refManager;

    @Autowired
    private Converter converter;

    @GetMapping(value = "/{id}", produces = "application/json")
    @ApiOperation(value = "Retrieve role by id", response = RoleDTO.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<RoleDTO> getRoleById(@PathVariable Long id) {

        Optional<Role> roleEntity = roleRepository.findById(id);
        if (roleEntity.isPresent()) {
            return ResponseEntity.ok(converter.toApiObject(roleEntity.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(consumes = "application/json", produces = "application/json")
    @ApiOperation(value = "Create new role")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> createOwner(@Valid @RequestBody RoleDTO roleDto, Errors errors) {
        try {
            if (errors.hasErrors()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors.getFieldErrors().get(0).toString());
            }
            Role savedRole = roleRepository.save(converter.toModelObject(roleDto));
            return ResponseEntity.status(HttpStatus.CREATED)
                    .location(converter.toApiObject(savedRole).getUri())
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Delete role by id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            roleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
        }
    }

    @PostMapping(value = "/{id}/{property}", consumes = "application/json", produces = "application/json")
    @ApiOperation(value = "Update owner property")
    @ResponseStatus(HttpStatus.OK)
    @SuppressFBWarnings({"DP", "REC"})
    public ResponseEntity<String> updateProperty(@PathVariable Long id, @PathVariable String property,
                                                 @RequestBody String value, Errors errors) {
        try {
            if (errors.hasErrors()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors.getFieldErrors().get(0).toString());
            }
            AnnotatedClass ac = refManager.fromClazz(RoleDTO.class);
            Field field = ac.getFields().get(property);
            if (field == null) {
                return new ResponseEntity<String>("Unknown property: " + property, HttpStatus.BAD_REQUEST);
            }
            // get term
            Optional<Role> roleEntity = roleRepository.findById(id);
            if (roleEntity.isPresent()) {
                RoleDTO roleDto = converter.toApiObject(roleEntity.get());
                refManager.setFieldValue(field, roleDto, value);
                roleRepository.save(converter.toModelObject(roleDto));
            } else {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
        }
    }
}
