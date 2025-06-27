package in.shubham.billingsoftware.io;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OrderRequest {

    private String customerName;
    private String phoneNumber;
    private List<OrderItemRequest> orderItems;
    private Double subTotal;
    private Double tax;
    private Double finalAmount;
    private String paymentMethod;

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Data
    public static class OrderItemRequest {
        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;
    }
}
