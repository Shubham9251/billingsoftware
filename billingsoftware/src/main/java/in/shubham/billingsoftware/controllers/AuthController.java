package in.shubham.billingsoftware.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import in.shubham.billingsoftware.io.AuthRequest;
import in.shubham.billingsoftware.io.AuthResponse;
// import in.shubham.billingsoftware.services.UserService;
import in.shubham.billingsoftware.services.imple.AppUserDetailsService;
import in.shubham.billingsoftware.utils.JwtUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequiredArgsConstructor
// @RequestMapping("/api/v1.0")
public class AuthController {

    
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    // private final UserService userService;


    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) throws Exception {
        authenticate(request.getEmail(), request.getPassword());

        final UserDetails userdetails = appUserDetailsService.loadUserByUsername(request.getEmail());
        System.out.println(userdetails.toString());
        final String jwtToken = jwtUtil.generateToken(userdetails);

        // String role = userService.getUserRole(request.getEmail());
        String role = userdetails.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse("");
        return new AuthResponse(request.getEmail(), jwtToken, role);
    }

    private void authenticate(String email, String Password) throws Exception{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, Password));
        } catch (DisabledException e) {
            throw new Exception("user disabled");
        }
        catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email or Password is Incorrect");
        }
    }
    
}
