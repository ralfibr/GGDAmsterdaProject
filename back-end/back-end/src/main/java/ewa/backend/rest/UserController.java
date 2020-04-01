package ewa.backend.rest;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

import ewa.backend.exception.UserNotFoundException;
import ewa.backend.repository.UserRepository;
import ewa.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

//This annotation indicates this is the controller for User entity.
//RestController is a combination of Controller and ResponseBody, to simplify the implementation.
//CrossOrigin enables Cross-Origin resource sharing (CORS) which specifies the origin, this way it saves some typing for every mapping.
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserRepository userRepositoryInterface;

    //GetMapping maps HTTP GET requests and then handles them with a function.
    //In this case if you visit the url with a certain email adress the repository will send a request to the database.
    //Then it will find all the information of the user that has this email.
    //PathVariable handles the parameter that is send with the function, it will bind it to the variable in the url.
    @GetMapping("/users/{email}")
    public User retrieveUserByEmail(@PathVariable String email) {
        return userRepositoryInterface.findByEmail(email);
    }

    @GetMapping("/users/{email}/{id}")
    public User retrieveUserByEmailId(@PathVariable String email, @PathVariable long id) {
        return userRepositoryInterface.findByEmailId(email, id);
    }

    @GetMapping("/users")
    public List<User> retrieveAllUsers() {
        return userRepositoryInterface.findAll();
    }

    //In this case it's a PostMapping for POST requests.
    @PostMapping("/users")
    public void createUser(@RequestBody User user) {
        userRepositoryInterface.save(user);
    }

    //In this case it's a DeleteMapping for DELETE requests.
    //In this function it will first use the repository to find a User with this email and id.
    //If such user exists it will delete them, if not it will throw an exception.
    @DeleteMapping("/users/{email}/{id}")
    public User deleteTag(@PathVariable String email, @PathVariable long id) {
        User user = userRepositoryInterface.deleteByEmailId(email, id);
        if (user == null)
            throw new UserNotFoundException("email-" + email + id);
        return user;
    }
}
