package com.sap.findthings.exception;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * The type Find thing exception.
 */
@Getter
@Setter
public class FindThingException extends RuntimeException {

    private List<String> messages;
    private int httpStatus;

    /**
     * Instantiates a new Find thing exception.
     *
     * @param asList     the as list
     * @param httpStatus the http status
     */
    public <T> FindThingException(List<String> asList, int httpStatus) {
        this.messages = asList;
        this.httpStatus = httpStatus;
    }
}
