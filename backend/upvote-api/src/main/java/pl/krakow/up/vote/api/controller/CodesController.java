package pl.krakow.up.vote.api.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import pl.krakow.up.vote.api.model.RegistrationCodeDTO;
import pl.krakow.up.vote.api.model.converter.Converter;
import pl.krakow.up.vote.api.util.APIAuthorizationUtils;
import pl.krakow.up.vote.api.util.APIUtils;
import pl.krakow.up.vote.model.RegistrationCode;
import pl.krakow.up.vote.service.RegistrationCodeService;

@Slf4j
@RestController
@RequestMapping("/codes")
@Api(value = "CRUD for codes")
public class CodesController {

    @Autowired
    private RegistrationCodeService codesService;

    @Autowired
    private Converter converter;

    @Autowired
    private APIAuthorizationUtils authUtils;


    @GetMapping(value = "/{id}", produces = "application/json")
    @ApiOperation(value = "Retrieve code by id", response = RegistrationCodeDTO.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<RegistrationCodeDTO> getCodeById(@PathVariable Long id, Principal principal) {
    	
    	log.debug("GET /v1/codes/{}", id);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        RegistrationCode code = codesService.findById(id);
        if (code == null) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot find code");
        }

        return ResponseEntity.ok(converter.toApiObject(code));
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    @ApiOperation(value = "Create new codes")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<List<Long>> createCodes(@RequestBody Map<String, Object> config, Principal principal) {
    	log.debug("POST /codes body={}", config);
    	
        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        if (config.get("count") == null || config.get("timeout") == null) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Count and time must be provided");
        }
        
        int count = (int)config.get("count");
        int validDays = (int)config.get("timeout");
        
        List<Long> ids = new ArrayList<>();
        for(int i = 0; i < count; i++) {
        	Long id = codesService.create(validDays);
            ids.add(id);
        }

        return ResponseEntity.ok().body(ids);
    }

    @DeleteMapping(value = "/{id}")
    @ApiOperation(value = "Delete code by id")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> deleteCodeById(@PathVariable Long id, Principal principal) {
        log.debug("DELETE v1/codes/{}", id);

        if(!authUtils.hasAdministratorRole(principal)) {
            return APIUtils.createErrorResponse(HttpStatus.FORBIDDEN, "You are not authorized to perform this operation");
        }

        try {
            codesService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(e.getMessage());
        }
    }

    @GetMapping(produces = "application/json")
    @ApiOperation(value = "Retrieve all codes", response = RegistrationCodeDTO.class)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<RegistrationCodeDTO>> getCodes() {
        List<RegistrationCodeDTO> codesDto = new ArrayList<>();
        codesService.findAll().stream().forEach(code -> codesDto.add(converter.toApiObject(code)));

        return ResponseEntity.ok(codesDto);
    }
}
