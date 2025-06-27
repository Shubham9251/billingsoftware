package in.shubham.billingsoftware.services.imple;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import in.shubham.billingsoftware.entity.OrderEntity;
import in.shubham.billingsoftware.entity.OrderItemEntity;
import in.shubham.billingsoftware.io.OrderRequest;
import in.shubham.billingsoftware.io.OrderResponse;
import in.shubham.billingsoftware.io.PaymentDetails;
import in.shubham.billingsoftware.io.PaymentMethod;
import in.shubham.billingsoftware.io.PaymentVerificationRequest;
import in.shubham.billingsoftware.repositery.OrderEntityRepository;
import in.shubham.billingsoftware.services.OrderService;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class OrderServiceImple implements OrderService{

    private final OrderEntityRepository orderEntityRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        OrderEntity newOrder = convertToOrderEntity(request);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItems = request.getOrderItems().stream()
            .map(this::convertToOrderItemEntity)
            .collect(Collectors.toList());

        newOrder.setOrderItems(orderItems);

        newOrder = orderEntityRepository.save(newOrder);

        return convertToOrderResponse(newOrder);
        
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest itemRequest) {
        return OrderItemEntity.builder()
            .itemId(itemRequest.getItemId())
            .name(itemRequest.getName())
            .price(itemRequest.getPrice())
            .quantity(itemRequest.getQuantity())
            .build();
        
    }

    private OrderResponse convertToOrderResponse(OrderEntity newOrder) {
       return OrderResponse.builder()
            .orderId(newOrder.getOrderId())
            .customerName(newOrder.getCustomerName())
            .phoneNumber(newOrder.getPhoneNumber())
            .subTotal(newOrder.getSubTotal())
            .tax(newOrder.getTax())
            .finalAmount(newOrder.getFinalAmount())
            .paymentMethod(newOrder.getPaymentMethod())
            .createdAt(newOrder.getCreatedAt())
            .orderItems(newOrder.getOrderItems().stream()
                .map(this::convertToItemResponse)
                .collect(Collectors.toList()))
            .paymentDetails(newOrder.getPaymentDetails())
            .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity item) {
        return OrderResponse.OrderItemResponse.builder()
            .itemId(item.getItemId())
            .itemName(item.getName())
            .itemPrice(item.getPrice())
            .quantity(item.getQuantity())
            .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
            .customerName(request.getCustomerName())
            .phoneNumber(request.getPhoneNumber())
            .subTotal(request.getSubTotal())
            .tax(request.getTax())
            .finalAmount(request.getFinalAmount())
            .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
            .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));
        
        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        return orderEntityRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(this::convertToOrderResponse)
            .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
    
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

        if (!verifyRazorpaySignatuere(request, existingOrder)) {
            throw new RuntimeException("Invalid payment signature");
        }   

        PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());

        existingOrder.setPaymentDetails(paymentDetails);
        existingOrder = orderEntityRepository.save(existingOrder);

        return convertToOrderResponse(existingOrder);
       
    }

    private boolean verifyRazorpaySignatuere(PaymentVerificationRequest request, OrderEntity existingOrder) {
        return true;
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderEntityRepository.sumSalesByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderEntityRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return orderEntityRepository.findRecentOrders(PageRequest.of(0, 5))
            .stream()
            .map(orderEntity -> convertToOrderResponse(orderEntity))
            .collect(Collectors.toList());
    }


    
}
