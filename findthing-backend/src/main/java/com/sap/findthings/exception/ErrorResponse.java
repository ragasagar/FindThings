package com.sap.findthings.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.List;

/**
 * The type Error response.
 */
@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {
    private List<String> messages;
    private HttpStatus httpStatus;
    private Instant timestamp;
}
