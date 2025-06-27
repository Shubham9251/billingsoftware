package in.shubham.billingsoftware.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.shubham.billingsoftware.exceptions.CategoryNotFoundException;
import in.shubham.billingsoftware.io.ItemRequest;
import in.shubham.billingsoftware.io.ItemResponse;
import in.shubham.billingsoftware.io.UpdateItemRequest;
import in.shubham.billingsoftware.services.ItemService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0")
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("item") String item, @RequestPart("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ItemRequest request = null;
        try {
            
            // System.out.println("Received item JSON: " + item); // Log the incoming JSON for debugging
            request = objectMapper.readValue(item, ItemRequest.class);

            // System.out.println(request.toString());
            // System.out.println(file.getOriginalFilename());
            return itemService.createItem(request, file);
        } catch (JsonProcessingException e) {
            System.err.println("Failed to parse item JSON: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid item data: " + e.getOriginalMessage());
        }
    }

    @GetMapping("/items")
    @ResponseStatus(HttpStatus.OK)
    public List<ItemResponse> fetchCategories() {
        return itemService.getItems();
    }

    @GetMapping("/admin/items/{itemId}") 
    @ResponseStatus(HttpStatus.OK)
    public ItemResponse fetchCategory(@PathVariable String itemId) {
        try {
            return itemService.getItem(itemId);
        } catch (CategoryNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/admin/items/{itemId}") 
    @ResponseStatus(HttpStatus.OK)
    public ItemResponse updateCategory(@RequestPart("item") String item, @PathVariable String itemId, @RequestPart(value = "file", required = false) MultipartFile file) {
        
        ObjectMapper objectMapper = new ObjectMapper();
        UpdateItemRequest request = null;
        try {

            request = objectMapper.readValue(item, UpdateItemRequest.class);
            
            return itemService.updateItem(request, itemId, file);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removeCategory(@PathVariable String itemId) {
        
        try {
            itemService.deleteItem(itemId);
        } catch (CategoryNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
    
    
}
