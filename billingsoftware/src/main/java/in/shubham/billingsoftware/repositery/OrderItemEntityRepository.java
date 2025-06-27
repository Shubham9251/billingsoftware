package in.shubham.billingsoftware.repositery;

import org.springframework.data.jpa.repository.JpaRepository;

import in.shubham.billingsoftware.entity.OrderItemEntity;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
 

}
