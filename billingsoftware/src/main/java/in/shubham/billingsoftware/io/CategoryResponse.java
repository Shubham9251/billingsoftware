package in.shubham.billingsoftware.io;


import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategoryResponse {
    
    private String categoryId;
    private String name;
    private String description;
    private String bgColor;
    private String imgUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer itemCount;
}
