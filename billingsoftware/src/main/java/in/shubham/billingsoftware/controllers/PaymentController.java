package in.shubham.billingsoftware.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import in.shubham.billingsoftware.io.OrderResponse;
import in.shubham.billingsoftware.io.PaymentRequest;
import in.shubham.billingsoftware.io.PaymentVerificationRequest;
import in.shubham.billingsoftware.io.RazorpayOrderResponse;
import in.shubham.billingsoftware.services.OrderService;
import in.shubham.billingsoftware.services.RazorpayService;
import lombok.RequiredArgsConstructor;

import com.razorpay.RazorpayException;


@RestController
@RequestMapping("/api/v1.0/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) throws RazorpayException {
        return orderService.verifyPayment(request);
    }
}
