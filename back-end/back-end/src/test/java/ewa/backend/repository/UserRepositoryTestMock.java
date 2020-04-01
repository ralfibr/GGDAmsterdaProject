package ewa.backend.repository;

import ewa.backend.entity.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

@SpringBootTest
public class UserRepositoryTestMock {

    //Create a mock of the UserRepository
    @Mock
    public UserRepository userRepository;

    @Test
    /**
     * First it creates a new user and saves it to the repository.
     * Next it will check if the created user and saved user are the same.
     * Finally it will get the created user from the repository and check if the original user is the same as the received user.
     */
    void TestUserCreatingAndGetting(){
        // Create user
        User user = new User(0, "Mark", "van Manen", "mark.van.manen@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "06 12345678", "Admin", "Amstel", "020 354 8537");
        when(userRepository.save(user)).thenReturn(user);
        // Save user
        User savedUser = userRepository.save(user);

        // Check if user and saved user are the same
        Assert.assertEquals(user, savedUser);

        // Get the user and check if it is the same as the received user
        when(userRepository.findByEmail(savedUser.getEmail())).thenReturn(user);
        User receivedUser = userRepository.findByEmail(savedUser.getEmail());
        assertEquals(receivedUser.getEmail(),savedUser.getEmail());
    }
}
