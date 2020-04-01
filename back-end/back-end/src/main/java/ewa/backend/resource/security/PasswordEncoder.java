package ewa.backend.resource.security;

import org.springframework.stereotype.Component;
import com.google.common.hash.Hashing;

import java.nio.charset.StandardCharsets;

/**
 * @Author Robert Neijmeijer
 * Password encoder
 */
@Component
public class PasswordEncoder {
    /**
     * Encode the given string by using the sha256 hashing function
     * @param toEncode The string to encode
     * @return The encoded string as a hash
     */
    public String encode(String toEncode){
        return Hashing.sha256().hashString(toEncode, StandardCharsets.UTF_8).toString();
    }
}
