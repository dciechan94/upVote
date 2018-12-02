package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BaseController {
    private static final Logger LOGGER = LogManager.getLogger(BaseController.class);

    @RequestMapping(value = "/base", method = RequestMethod.GET)
    @ResponseBody
    public List<String> base(Principal user) {
        List<String> response = new ArrayList<>();

        response.add(user.getName());

        return response;
    }

}