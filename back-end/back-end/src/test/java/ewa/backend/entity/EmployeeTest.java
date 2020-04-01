package ewa.backend.entity;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Mark van Manen
 * Student ID: 500808973
 */

class EmployeeTest {

    @Before
    void createAnEmployeeForAllTests(){
    }

    @Test
    void checkIDGetter() {
        User user = new User(1, "Mark", "van Manen", "mark.van.manen@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "0612345678", "Admin", "Amstel", "020 394 2834");
        long expectedResult = 1;
        long realResult = user.getId();
        assertEquals(expectedResult, realResult);
    }

    @Test
    void checkIDSetter() {
        User user = new User(1, "Mark", "van Manen", "mark.van.manen@hva.nl", "d9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e", "0612345678", "Admin", "Amstel", "020 394 2834");
        long expectedResult = 5;
        user.setId(5);
        long realResult = user.getId();
        assertEquals(expectedResult, realResult);
    }

}
