package in.shubham.billingsoftware.services.imple;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import in.shubham.billingsoftware.entity.UserEntity;
import in.shubham.billingsoftware.repositery.UserRepositery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService{

    private final UserRepositery userRepositery;

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity existingUser = userRepositery.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Email not found for the email: " + email));
        
        String role = existingUser.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }
        return new User(existingUser.getEmail(), existingUser.getPassword(), Collections.singleton(new SimpleGrantedAuthority(role)));
    }
}
