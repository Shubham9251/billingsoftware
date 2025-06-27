package in.shubham.billingsoftware.io;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OrderResponse {

    private String orderId;
    private String customerName;
    private String phoneNumber;
    private List<OrderResponse.OrderItemResponse> orderItems;
    private Double subTotal;
    private Double tax;
    private Double finalAmount;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt; 
    private PaymentDetails paymentDetails;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Data
    public static class OrderItemResponse {
        private String itemId;
        private String itemName;
        private Double itemPrice;
        private Integer quantity;
    }
}