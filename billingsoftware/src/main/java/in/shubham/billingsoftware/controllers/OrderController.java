package in.shubham.billingsoftware.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

import org.springframework.http.HttpStatus;

import in.shubham.billingsoftware.io.OrderRequest;
import in.shubham.billingsoftware.io.OrderResponse;
import in.shubham.billingsoftware.services.OrderService;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/v1.0/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        return orderService.createOrder(request);
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getAllOrders() {
        return orderService.getLatestOrders();
    }

}
