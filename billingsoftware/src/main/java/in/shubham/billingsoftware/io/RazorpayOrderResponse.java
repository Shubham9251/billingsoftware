package in.shubham.billingsoftware.io;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RazorpayOrderResponse {

    private String id;
    private String entity;
    private Double amount;
    private String currency;
    private String receipt;
    private String status;
    private Date createdAt;

  
}
