package in.shubham.billingsoftware.services;

import java.time.LocalDate;
import java.util.List;


import in.shubham.billingsoftware.io.OrderRequest;
import in.shubham.billingsoftware.io.OrderResponse;
import in.shubham.billingsoftware.io.PaymentVerificationRequest;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesByDate(LocalDate date);

    Long countByOrderDate(LocalDate date);

    List<OrderResponse> findRecentOrders();
}
