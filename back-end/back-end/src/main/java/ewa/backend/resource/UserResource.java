package ewa.backend.resource;

import ewa.backend.entity.User;
import ewa.backend.exception.UserNotFoundException;
import ewa.backend.repository.UserRepository;
import ewa.backend.resource.exceptions.AuthenticationException;
import ewa.backend.resource.security.JWTokenInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserResource {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/rest/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/rest/users/{id}")
    public User getUserById(@PathVariable int id) {
        User userById = userRepository.findById(id);
        if (userById == null) throw new UserNotFoundException("id = " + id);
        return userById;
    }

    @DeleteMapping("/rest/users{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable int id, @RequestAttribute(value = JWTokenInfo.KEY) JWTokenInfo tokenInfo) {
        if (!tokenInfo.isAdmin()) throw new AuthenticationException("Only super admins can remove employee's");

        User user = getUserById(id);

        userRepository.delete(user);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/rest/users")
    public ResponseEntity<Object> updateUser(@RequestBody User user) {
        User userById = userRepository.findById(user.getId());

        if (userById == null) throw new UserNotFoundException("id =" + user.getId());

        userRepository.save(userById);
        return ResponseEntity.ok().build();
    }

    @PostMapping("rest/users")
    public ResponseEntity<Object> saveUser(@RequestBody User user) {

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
