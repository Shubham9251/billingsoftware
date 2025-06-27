package in.shubham.billingsoftware.io;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateItemRequest {

    
    private String name;
    private String description;
    private BigDecimal price;
}
