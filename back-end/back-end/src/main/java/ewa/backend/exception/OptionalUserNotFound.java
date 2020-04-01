/**
 * @Author: Teun Stout
 * Study: Software Engineering
 * Class: iS202
 * All code in this class is from Teun Stout
 *
 * Exception for if a optional user is not found
 */
package ewa.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OptionalUserNotFound extends RuntimeException{
    public OptionalUserNotFound(String message) {
        super(message);
    }
}
