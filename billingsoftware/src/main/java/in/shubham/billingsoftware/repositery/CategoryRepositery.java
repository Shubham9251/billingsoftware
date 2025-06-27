package in.shubham.billingsoftware.repositery;


import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import in.shubham.billingsoftware.entity.CategoryEntity;
// import in.shubham.billingsoftware.io.UpdateCategoryRequest;

@Repository
public interface CategoryRepositery extends JpaRepository<CategoryEntity, Long> {

    boolean existsByCategoryId(String categoryId);

    void deleteByCategoryId(String categoryId);
 
    CategoryEntity findByCategoryId(String categoryId);

    CategoryEntity findByName(String categoryName);

    
    // //update category
    // @Query("UPDATE categories c SET c.name = :#{#request.name}, c.description = :#{#request.description}, c.bgColor = :#{#request.bgColor} WHERE c.categoryId = :#{#request.categoryId}")
    // CategoryEntity updateCategory(UpdateCategoryRequest request);

}
