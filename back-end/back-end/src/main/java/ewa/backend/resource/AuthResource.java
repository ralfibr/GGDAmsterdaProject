package ewa.backend.resource;

import com.fasterxml.jackson.databind.node.ObjectNode;
import ewa.backend.entity.User;
import ewa.backend.repository.UserRepository;
import ewa.backend.resource.exceptions.AuthenticationException;
import ewa.backend.resource.security.JWTokenUtils;
import ewa.backend.resource.security.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

/**
 * @Author Robert Neijmeijer
 * Authenticate controller
 */
@RestController
@CrossOrigin
public class AuthResource {

    @Autowired
    private JWTokenUtils tokenGenerator;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    /**
     * Create a user
     * @param signupInfo The info of the user to be created
     * @return Returns the created user
     */
    @PostMapping("/rest/auth/users")
    public ResponseEntity<Object> createUser(@RequestBody ObjectNode signupInfo) {

        // fetch all de data from the sinupInfo
        String email = signupInfo.get("email") == null ? null : signupInfo.get("email").asText();
        String firstName = signupInfo.get("firstname") == null ? null : signupInfo.get("firstname").asText();
        String givenPassword = signupInfo.get("password") == null ? null : signupInfo.get("password").asText();
        String lastName = signupInfo.get("lastname") == null ? null : signupInfo.get("lastname").asText();
        String phoneNumber = signupInfo.get("number") == null ? null : signupInfo.get("number").asText();
        String function = signupInfo.get("Function") == null ? null : signupInfo.get("Function").asText();
        String district = signupInfo.get("district") == null ? null : signupInfo.get("district").asText();
        boolean admin = signupInfo.get("admin") == null ? null : signupInfo.get("admin").asBoolean();
        // Create a new user and set all the values
        User user = new User();

        user.setEmail(email);
        user.setVoornaam(firstName);
        user.setAchternaam(lastName);
        user.setEncodedPassword(encoder.encode(givenPassword));
        user.setTelefoon(phoneNumber);
        user.setFunctie(function);
        user.setStadDeel(district);
        user.setAdmin(admin);
        // Save the user
        User savedUser = userRepository.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(savedUser.getEmail()).toUri();

        return ResponseEntity.created(location).build();
    }

    /**
     * Authenticate a user
     * @param signOnInfo The information of the signed in user
     * @return Accepted hhtp
     * @throws AuthenticationException
     */
    @PostMapping(path = "rest/auth", produces = "application/json")
    public ResponseEntity<User> authenticateUser(@RequestBody ObjectNode signOnInfo) throws AuthenticationException {

        // Get the email and password from the sinOnInfo
        String email = signOnInfo.get("email").asText();
        String password = signOnInfo.get("password").asText();

        // Get the corresponding user from the repo
        User user = userRepository.findByEmail(email);
        // If user is null it doesn't exist in the repo
        if (user == null) throw new AuthenticationException("Invalid user and/or password");

        String encodedPassword = encoder.encode(password);

        // Validate the password
        if (!user.validateEncodedPassword(encodedPassword))
            throw new AuthenticationException("Invalid user and/or password");
        // Encode the user
        String token = tokenGenerator.encode(user.getEmail(), user.isAdmin());
        //Give the user back in the body of the response, Adding bearer for good practice
        return ResponseEntity.accepted().header(HttpHeaders.AUTHORIZATION, "Bearer " + token).body(user);

    }
}
