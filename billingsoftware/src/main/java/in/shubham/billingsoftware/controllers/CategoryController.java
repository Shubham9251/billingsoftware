package in.shubham.billingsoftware.controllers;


import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.shubham.billingsoftware.io.CategoryRequest;
import in.shubham.billingsoftware.io.CategoryResponse;
import in.shubham.billingsoftware.io.UpdateCategoryRequest;
import in.shubham.billingsoftware.services.CategoryServices;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import in.shubham.billingsoftware.exceptions.CategoryNotFoundException;

 

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0")
public class CategoryController {

    private final CategoryServices categoryService;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String category,
            @RequestPart("file") MultipartFile file) {
                
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryRequest request = null;
        try {

            request = objectMapper.readValue(category, CategoryRequest.class);
    
            // System.out.println(request.toString());
            // System.out.println(file.getOriginalFilename());
            return categoryService.addCategory(request, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category data");
        }
    }

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryResponse> fetchCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/admin/categories/{categoryId}") 
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse fetchCategory(@PathVariable String categoryId) {
        try {
            return categoryService.getCategory(categoryId);
        } catch (CategoryNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/admin/categories/{categoryId}") 
    @ResponseStatus(HttpStatus.OK)
    public CategoryResponse updateCategory(@RequestPart("category") String category, @PathVariable String categoryId, @RequestPart(value = "file", required = false) MultipartFile file) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        UpdateCategoryRequest request = null;
        try {

            request = objectMapper.readValue(category, UpdateCategoryRequest.class);
            
            return categoryService.updateCategory(request, categoryId, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCategory(@PathVariable String categoryId) {
        
        try {
            categoryService.deleteCategory(categoryId);
        } catch (CategoryNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }


}
