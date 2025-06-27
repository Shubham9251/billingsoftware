package in.shubham.billingsoftware.services;


import in.shubham.billingsoftware.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {

   RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
