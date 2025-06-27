package in.shubham.billingsoftware.services.imple;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import in.shubham.billingsoftware.entity.CategoryEntity;
import in.shubham.billingsoftware.exceptions.CategoryNotFoundException;
import in.shubham.billingsoftware.io.CategoryRequest;
import in.shubham.billingsoftware.io.CategoryResponse;
import in.shubham.billingsoftware.io.UpdateCategoryRequest;
import in.shubham.billingsoftware.repositery.CategoryRepositery;
import in.shubham.billingsoftware.repositery.ItemRepositery;
import in.shubham.billingsoftware.services.CategoryServices;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryImplementation implements CategoryServices {

    private final CategoryRepositery categoryRepositery;
    private final FileUplodeImple fileUplodeImple;
    private final ItemRepositery itemRepositery;

    @Override
    public CategoryResponse addCategory(CategoryRequest request, MultipartFile file) {
        
        CategoryEntity newCategory = convertToEntity(request);

        if (file != null && !file.isEmpty()) {

            String imgUrl = fileUplodeImple.uplodeFile(file);
            newCategory.setImgUrl(imgUrl);
        }
        

        newCategory = categoryRepositery.save(newCategory);

        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        List<CategoryEntity> categories = categoryRepositery.findAll();

        return categories.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getCategory(String categoryId) {
     
       return Optional.ofNullable(categoryRepositery.findByCategoryId(categoryId))
            .map(this::convertToResponse)
            .orElseThrow(() -> new CategoryNotFoundException("Category not found with id: " + categoryId));
    }

    @Override
    @Transactional
    public void deleteCategory(String categoryId) {

        if (!categoryRepositery.existsByCategoryId(categoryId)) {
            throw new CategoryNotFoundException("Category not found with id: " + categoryId);
        }
        
        CategoryEntity category = categoryRepositery.findByCategoryId(categoryId);

        // First, delete all items belonging to this category
        itemRepositery.deleteByCategoryId(category.getId());

        // Get the image URL before deleting the category
        String imgUrl = category != null ? category.getImgUrl() : null;
        if (imgUrl != null && !imgUrl.isEmpty()) {
            boolean isDeleted = fileUplodeImple.deleteFile(imgUrl);
            if (!isDeleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image!!");
            }
        }

        categoryRepositery.deleteByCategoryId(categoryId);
    }

    @Override
    public CategoryResponse updateCategory(UpdateCategoryRequest request, String categoryId, MultipartFile file) {

        if (categoryId == null || categoryId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category ID is required for update");
        }

        CategoryEntity existingCategory = categoryRepositery.findByCategoryId(categoryId);
        if (existingCategory == null) {
            throw new CategoryNotFoundException("Category not found with id: " + categoryId);
        }

        if (file != null && !file.isEmpty()) {
            // If a new file is provided, delete the old image first
            boolean isDeleted = fileUplodeImple.deleteFile(existingCategory.getImgUrl());
            if (!isDeleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image!!");
            }
            String imgUrl = fileUplodeImple.uplodeFile(file);
            existingCategory.setImgUrl(imgUrl);
        }

        existingCategory.setName(request.getName());
        existingCategory.setDescription(request.getDescription());
        existingCategory.setBgColor(request.getBgColor());
        existingCategory.setUpdatedAt(java.time.LocalDateTime.now());

        CategoryEntity updatedCategory = categoryRepositery.save(existingCategory);

        return convertToResponse(updatedCategory);
       
    }


    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
       
        Integer itemCount = itemRepositery.countByCategoryId(newCategory.getId());

        return CategoryResponse.builder()
            .categoryId(newCategory.getCategoryId())
            .name(newCategory.getName())
            .description(newCategory.getDescription())
            .bgColor(newCategory.getBgColor())
            .imgUrl(newCategory.getImgUrl())
            .createdAt(newCategory.getCreatedAt())
            .updatedAt(newCategory.getUpdatedAt())
            .itemCount(itemCount)
            .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
      
        return CategoryEntity.builder()
            .categoryId(UUID.randomUUID().toString())
            .name(request.getName())
            .description(request.getDescription())
            .bgColor(request.getBgColor())
            .build();
    }
  
}
