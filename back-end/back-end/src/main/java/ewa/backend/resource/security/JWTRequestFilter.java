package ewa.backend.resource.security;

import ewa.backend.resource.exceptions.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;


/**
 * @Author Robert Neijmeijer
 * The request filter for the jason web token
 */
@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JWTokenUtils jwTokenUtils;

    private static final Set<String> SECURED_PATHS = Set.of("/rest/users","/rest/posts");

    /**
     * See if the request is legitimate
     * @param request The request
     * @param response The response
     * @param filterChain The filterchain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain)
                                    throws ServletException, IOException {

        try {
            String path = request.getServletPath();

            if(HttpMethod.OPTIONS.matches(request.getMethod()) || SECURED_PATHS.stream().noneMatch(path::startsWith)){
                filterChain.doFilter(request,response);
                return;
            }

            String encodedToken = request.getHeader(HttpHeaders.AUTHORIZATION);

            if(encodedToken == null) throw new AuthenticationException("Authentication error");

            encodedToken.replace("Bearer ", "");

            JWTokenInfo tokenInfo = jwTokenUtils.decode(encodedToken);

            request.setAttribute(tokenInfo.KEY,tokenInfo);

            filterChain.doFilter(request,response);
        } catch (AuthenticationException e){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Authentication error");
            return;
        }

    }
}
