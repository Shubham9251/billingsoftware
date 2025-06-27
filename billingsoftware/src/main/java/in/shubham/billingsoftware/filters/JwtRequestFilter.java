package in.shubham.billingsoftware.filters;


import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import in.shubham.billingsoftware.services.imple.AppUserDetailsService;
import in.shubham.billingsoftware.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwtToken = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            email = jwtUtil.extractUsername(jwtToken);
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = appUserDetailsService.loadUserByUsername(email);

            if (jwtUtil.validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = 
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
            else {
                // i want to change response status to 401 Unauthorized if token is invalid
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT Token");
                // Stop further processing if the token is invalid
            }
        }
        

        filterChain.doFilter(request, response);
    }

}

/*
 * No session management is used here because JWT (JSON Web Token) authentication is stateless.
 * This approach is not less secure or unprofessional. In fact, stateless authentication is a best practice for RESTful APIs.
 * Each request is authenticated independently using the JWT, so there is no need to store session data on the server.
 * This improves scalability and security by reducing server-side state and attack surface.
 */