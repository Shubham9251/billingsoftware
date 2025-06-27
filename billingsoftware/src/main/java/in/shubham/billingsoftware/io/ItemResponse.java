package in.shubham.billingsoftware.io;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ItemResponse {

    private String itemId;
    private String name;
    private String description;
    private BigDecimal price;
    private String categoryName;
    private String imgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
