package in.shubham.billingsoftware.repositery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.shubham.billingsoftware.entity.UserEntity;
import java.util.Optional;

@Repository
public interface UserRepositery extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserId(String UserId);
    
}
