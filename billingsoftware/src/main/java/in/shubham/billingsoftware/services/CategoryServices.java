package in.shubham.billingsoftware.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.shubham.billingsoftware.io.CategoryRequest;
import in.shubham.billingsoftware.io.CategoryResponse;
import in.shubham.billingsoftware.io.UpdateCategoryRequest;


public interface CategoryServices {
    CategoryResponse addCategory(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> getAllCategories();

    void deleteCategory(String categoryId);

    CategoryResponse getCategory(String categoryId);

    CategoryResponse updateCategory(UpdateCategoryRequest request, String categoryId, MultipartFile file);
}
