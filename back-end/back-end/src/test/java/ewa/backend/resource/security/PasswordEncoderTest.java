package ewa.backend.resource.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @Author Robert Neijmeijer
 */
@SpringBootTest
class PasswordEncoderTest {

    String password1 = "Test";
    String password2 = "Test2";
    String password3 = "Test3";
    String encodedPassword1 = "532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25";
    String encodedPassword2 = "32e6e1e134f9cc8f14b05925667c118d19244aebce442d6fecd2ac38cdc97649";
    String encodedPassword3 = "68235f4551b9c6423df2af7ead63c90cdd4201ac08525bc3a41cd4755c6c86cb";

    @Autowired
    private PasswordEncoder encoder;

    /**
     * Test that the already encoded passwords match with the new encoded passwords
     */
    @Test
    void encode() {
        assertEquals(encodedPassword1,encoder.encode(password1));
        assertEquals(encodedPassword2,encoder.encode(password2));
        assertEquals(encodedPassword3,encoder.encode(password3));
    }

    /**
     * Test that the passwords aren't the same
     */
    @Test
    void testDontMatch(){
        assertNotEquals(encoder.encode(password1),encoder.encode(password2));
        assertNotEquals(encoder.encode(password1),encoder.encode(password3));
        assertNotEquals(encoder.encode(password1),encodedPassword2);
        assertNotEquals(encoder.encode(password1),encodedPassword3);
    }
}