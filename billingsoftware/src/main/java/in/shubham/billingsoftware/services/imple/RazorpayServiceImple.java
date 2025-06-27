package in.shubham.billingsoftware.services.imple;

import java.util.Date;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Order;

import in.shubham.billingsoftware.io.RazorpayOrderResponse;
import in.shubham.billingsoftware.services.RazorpayService;

@Service
public class RazorpayServiceImple implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        if (amount == null || amount <= 0)
        throw new IllegalArgumentException("Amount must be positive.");
        if (currency == null || currency.isBlank())
        throw new IllegalArgumentException("Currency is required.");
        

        // Initialize Razorpay client with the provided key ID and secret
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // Amount in paise
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", "receipt#1"+ System.currentTimeMillis());
        orderRequest.put("payment_capture", 1); // Auto capture payment

        // Create the order
        Order order = razorpayClient.orders.create(orderRequest);

        return convertToRespponse(order);
    }

    private RazorpayOrderResponse convertToRespponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id").toString())
                .entity(order.get("entity").toString())
                .amount(order.get("amount") != null ? (Double) order.get("amount") / 100 : null)
                .currency(order.get("currency").toString())
                .receipt(order.get("receipt").toString())
                .status(order.get("status").toString())
                .createdAt(order.get("created_at") != null ? (Date) order.get("created_at") : null)
                .build();
        
    }

    

}
