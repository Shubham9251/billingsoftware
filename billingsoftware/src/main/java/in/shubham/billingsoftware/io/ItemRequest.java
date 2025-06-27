package in.shubham.billingsoftware.io;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ItemRequest {

    private String name;
    private String description;
    private BigDecimal price;
    private String categoryName;
    private String imgUrl;

}
