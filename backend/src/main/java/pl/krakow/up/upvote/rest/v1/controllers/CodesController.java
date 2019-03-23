package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.krakow.up.upvote.rest.util.APIUtils;
import pl.krakow.up.upvote.rest.v1.model.dto.CodeDTO;
import pl.krakow.up.upvote.rest.v1.model.util.Mappers;
import pl.krakow.up.upvote.services.ActionCodesManagementService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RequestMapping(value = "/codes")
public class CodesController {
    private static final Logger LOGGER = LogManager.getLogger(CodesController.class);


    @Autowired
    private ActionCodesManagementService codesService;


    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity createCodes(
            @RequestBody Map<String, Object> config) {
        LOGGER.debug("POST /codes body={}", config);

        String codeType = (String)config.get("type");
        int count = (int)config.get("count");

        if(!codeType.equals("registration")) {
            return APIUtils.createErrorResponse(HttpStatus.BAD_REQUEST, "Cannot create code");
        }
        List<Long> ids = new ArrayList<>();
        for(int i = 0; i < count; i++) {
            ids.add(codesService.createRegistrationCode());
        }

        return ResponseEntity.ok().body(ids);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public List<CodeDTO> getCodes() {
        LOGGER.debug("GET /codes");
        List<CodeDTO> response = codesService.getRegistrationCodes()
                .stream()
                .map(code -> Mappers.CODE_TO_DTO_MAPPER(code))
                .collect(Collectors.toList());

        return response;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity deleteCodes(
            @RequestBody Map<String, Object> config) {
        LOGGER.debug("DELETE /codes body={}\", config");

        List<Long> ids = (List<Long>)config.get("ids");
        ids.forEach(id -> codesService.deleteRegistrationCodeById(id));

        return ResponseEntity.ok().body(null);
    }
}
