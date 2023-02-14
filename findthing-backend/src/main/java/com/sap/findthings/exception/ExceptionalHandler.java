package com.sap.findthings.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

/**
 * The type Exceptional handler.
 */
@ControllerAdvice
public class ExceptionalHandler {

    /**
     * Find thing exception response entity response entity.
     *
     * @param e the e
     * @return the response entity
     */
    @ExceptionHandler(FindThingException.class)
    public ResponseEntity<ErrorResponse> findThingExceptionResponseEntity(FindThingException e){
        return new ResponseEntity<>(new ErrorResponse(e.getMessages(),
                HttpStatus.valueOf(e.getHttpStatus()),Instant.now()),HttpStatus.valueOf(e.getHttpStatus()));
    }
}
