package ewa.backend.rest;

import ewa.backend.entity.Employee;
import ewa.backend.entity.User;
import ewa.backend.repository.UserRepositoryInterface;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {
    @Autowired
    UserRepositoryInterface userRepositoryInterface;

    @Autowired
    private TestRestTemplate restTemplate;

    private static final Logger log =
            LoggerFactory.getLogger(ProjectController.class);

    //Test to get all users
    @Test
    void getAllUsers() {
        String message = this.restTemplate.getForObject("/users", String.class);
    }

    //Test to create a user by creating a dummy user. Then saving the user and lastly retrieve the user.
    // This is checked by the status code which should be OK and the retrievedUser shouldn't be null.
    @Test
    void createUser() {
        User user = new User(1, "Mark", "van Manen", "mark.van.manen@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "0612345678", "Admin", "Amstel", "020 394 2834");
        this.userRepositoryInterface.save(user);
        this.restTemplate.postForObject("/users/",user,Employee.class);

        ResponseEntity<User> responseEntity = this.restTemplate.getForEntity("/users/" +user.getEmail() + "/" + user.getId(), User.class);
        User retrievedUser = responseEntity.getBody();
        // check if the HTTP Request right
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        // check if the name right
        assert retrievedUser != null;
        assertEquals(user.getVoornaam() , retrievedUser.getVoornaam());
    }

    //Test to retrieve a user by their email and ID.
    //This is checked by finding what the response starts with, it should start with ID: 1.
    @Test
    void retrieveUserByEmailAndId() {
        String message = this.restTemplate.getForObject("/users/mark.van.manen@hva.nl/1" , String.class);
        log.info(message);
        assertTrue(message.startsWith("{\"id\":1"));

    }

    //Test to check if it's possible to update a user.
    //Firstly a new user is made, then the phone number is changed using setTelefoon.
    //To check if it works the response should contain the newly changed phone number.
    @Test
    void updateUser() {
        User user =  new User(2, "Henk", "De Boer", "henk.de.boer@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "0612345678", "Admin", "Amstel", "020 394 2834");
        user.setTelefoon("0610101010");
        userRepositoryInterface.save(user);
        String message = this.restTemplate.getForObject("/users/henk.de.boer@hva.nl/2" , String.class);
        assertTrue(message.contains("0610101010"));

    }

    //Test to delete a user.
    //The user is deleted in 2 ways, just to be safe.
    //The retrievedUser should be null because it has been deleted.
    @Test
    void deleteUser() {
        userRepositoryInterface.deleteByEmailId("mark.van.manen@hva.nl", 1);
        this.restTemplate.delete("/users/mark.van.manen@hva.nl");

        ResponseEntity<User> responseEntity = this.restTemplate.getForEntity("/users/mark.van.manen@hva.nl/1", User.class);
        User retrievedUser = responseEntity.getBody();
        assert retrievedUser == null;
    }
}
