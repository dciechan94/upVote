package pl.krakow.up.upvote.rest.v1.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.krakow.up.upvote.rest.model.BusinessExceptionModel;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionController {

    private static final Logger LOGGER = LogManager.getLogger(ExceptionController.class);
    private static final String ERROR_MESSAGE = "An error occurred during request processing. Please contact with the support.";


    @ExceptionHandler({Exception.class})
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @RequestMapping(produces = "application/json")
    @ResponseBody
    public BusinessExceptionModel handleNotFoundException(HttpServletRequest request, Exception exception) {
        LOGGER.error("Not handled exception occurred. \nRequest: {} \nMethod: {}", request.getRequestURI(), request.getMethod(), exception);
        String message;
        if (exception.getMessage() == null) {
            message = ERROR_MESSAGE;
        } else {
            message = exception.getMessage();
        }
        return new BusinessExceptionModel(message);
    }
}
