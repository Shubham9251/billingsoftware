package in.shubham.billingsoftware.io;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.AllArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CategoryRequest {
 
    private String name;
    private String description;
    private String bgColor;
}
