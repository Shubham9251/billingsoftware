package in.shubham.billingsoftware.services.imple;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import in.shubham.billingsoftware.entity.UserEntity;
import in.shubham.billingsoftware.exceptions.UserNotFoundException;
import in.shubham.billingsoftware.io.UserRequest;
import in.shubham.billingsoftware.io.UserResponse;
import in.shubham.billingsoftware.repositery.UserRepositery;
import in.shubham.billingsoftware.services.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImple implements UserService{

    private final UserRepositery userRepositery;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        String role = request.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
            request.setRole(role);
        }

        UserEntity newUser = convertToEntity(request);

        newUser = userRepositery.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepositery.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("user not found with this email: " + email));
     
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepositery.findAll()
            .stream()
            .map(user -> convertToResponse(user))
            .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepositery.findByUserId(id).orElseThrow(() -> new UserNotFoundException("user not found with this id: " + id));
        
        userRepositery.delete(existingUser);
        
    }

    private UserResponse convertToResponse(UserEntity user) {
        return UserResponse.builder()
            .name(user.getName())
            .UserId(user.getUserId())
            .email(user.getEmail())
            .role(user.getRole())
            .createdAt(user.getCreatedAt())
            .updatedAt(user.getUpdatedAt())
            .build();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
            .userId(UUID.randomUUID().toString())
            .name(request.getName())
            .email(request.getEmail())
            .password(encodePassword(request.getPassword()))
            .role(request.getRole().toUpperCase())
            .build();
    }

    public String encodePassword(String password) {
        
        return passwordEncoder.encode(password);
    }

}
