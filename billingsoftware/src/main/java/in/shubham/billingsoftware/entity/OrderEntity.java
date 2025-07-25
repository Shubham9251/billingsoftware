package in.shubham.billingsoftware.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import in.shubham.billingsoftware.io.PaymentDetails;
import in.shubham.billingsoftware.io.PaymentMethod;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders")
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String orderId;
    private String customerName;
    private String phoneNumber;
    private Double subTotal;
    private Double tax;
    private Double finalAmount;

    private LocalDateTime createdAt; 

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItemEntity> orderItems = new ArrayList<>();

    @Embedded
    private PaymentDetails paymentDetails;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @PrePersist
    protected void onCreate() {
        this.orderId = "ORD" + System.currentTimeMillis();
        this.createdAt = LocalDateTime.now();
    }

}
