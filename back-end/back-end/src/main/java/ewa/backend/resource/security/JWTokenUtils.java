package ewa.backend.resource.security;

import ewa.backend.resource.exceptions.AuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * @Author Robert Neijmeijer
 * Utility functions for the jason web token
 */
@Component
public class JWTokenUtils {

    public static final String JWT_ADMIN_CLAIM = "admin";

    @Value("${jwt.issuer:MyOrganisation}")
    private String issuer;

    @Value("${jwt.pass-phrase}")
    private String passphrase;

    @Value("${jwt.expiration-seconds}")
    private int expiration;

    /**
     * Make a jason web token
     * @param id The id of the token
     * @param admin Is the user an admin
     * @return The jason web token
     */
    public String encode(String id,boolean admin){

        Key key = getKey(passphrase);

        return Jwts.builder()
                .claim(Claims.SUBJECT,id)
                .claim(JWT_ADMIN_CLAIM,Boolean.toString(admin))
                .setIssuer(issuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration + 1000))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    /**
     * Generate a key with the given string
     * @param _passphrase The string
     * @return The key
     */
    private Key getKey(String _passphrase){
        byte[] hmacKey = passphrase.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    }

    /**
     * Decode a Jason Web Token
     * @param encodedToken the encoded token
     * @return The decoded token
     * @throws AuthenticationException Throws exceptions
     */
    public JWTokenInfo decode (String encodedToken) throws AuthenticationException {
        try {

            Key key = getKey(passphrase);
            Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
            Claims claims = jws.getBody();

            JWTokenInfo tokenInfo = new JWTokenInfo();
            tokenInfo.setEmail(claims.get(Claims.SUBJECT).toString());

            String isAdmin = claims.get(JWT_ADMIN_CLAIM).toString();
            tokenInfo.setAdmin(Boolean.parseBoolean(isAdmin));

            return tokenInfo;
        } catch (ExpiredJwtException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException | SignatureException e){
            throw new AuthenticationException(e.getMessage());
        }
    }

}
