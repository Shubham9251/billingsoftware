package in.shubham.billingsoftware.services;

import java.util.List;

import in.shubham.billingsoftware.io.UserRequest;
import in.shubham.billingsoftware.io.UserResponse;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);

}
