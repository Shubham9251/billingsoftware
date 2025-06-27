package in.shubham.billingsoftware.repositery;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import in.shubham.billingsoftware.entity.OrderEntity;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {
    
    // Custom query to find an order by its orderId
    Optional<OrderEntity> findByOrderId(String orderId);
    
    // Custom query to find all orders ordered by creation date in descending order
    List<OrderEntity> findAllByOrderByCreatedAtDesc();
    
    @Query("SELECT SUM(o.finalAmount) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
    Double sumSalesByDate(@Param("date") LocalDate date);

    @Query("SELECT COUNT(o) FROM OrderEntity o WHERE DATE(o.createdAt) = :date")
    Long countByOrderDate(@Param("date") LocalDate date);

    @Query("SELECT o FROM OrderEntity o ORDER BY o.createdAt DESC")
    List<OrderEntity> findRecentOrders(PageRequest pageable);
}
