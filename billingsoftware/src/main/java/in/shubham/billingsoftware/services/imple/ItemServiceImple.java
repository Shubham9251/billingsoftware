package in.shubham.billingsoftware.services.imple;

import java.time.LocalDateTime;
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
import in.shubham.billingsoftware.entity.ItemEntity;
import in.shubham.billingsoftware.exceptions.CategoryNotFoundException;
import in.shubham.billingsoftware.exceptions.ItemNotFoundException;
import in.shubham.billingsoftware.io.ItemRequest;
import in.shubham.billingsoftware.io.ItemResponse;
import in.shubham.billingsoftware.io.UpdateItemRequest;
import in.shubham.billingsoftware.repositery.CategoryRepositery;
import in.shubham.billingsoftware.repositery.ItemRepositery;
import in.shubham.billingsoftware.services.ItemService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemServiceImple implements ItemService {

    private final ItemRepositery itemRepositery;
    private final FileUplodeImple fileUplodeImple;
    private final CategoryRepositery categoryRepositery;


    @Override
    public ItemResponse createItem(ItemRequest request, MultipartFile file) {
       ItemEntity newItem = convertToEntity(request);

        if (file != null && !file.isEmpty()) {

            String imgUrl = fileUplodeImple.uplodeFile(file);
            newItem.setImgUrl(imgUrl);
        }
       
        System.out.println(request);
        // Check if the category exists or not
       CategoryEntity existsCategory = Optional.ofNullable(categoryRepositery.findByName(request.getCategoryName()))
            .orElseThrow(() -> new CategoryNotFoundException("Category not found with name: " + request.getCategoryName()));

        newItem.setCategory(existsCategory);
        
       newItem = itemRepositery.save(newItem);
       
        return convertToResponse(newItem);
    }

    @Override
    public List<ItemResponse> getItems() {
        List<ItemEntity> items = itemRepositery.findAll();

        return items.stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
        
    }

    @Override
    public ItemResponse getItem(String itemId) {

        return Optional.ofNullable(itemRepositery.findByItemId(itemId))
            .map(this::convertToResponse)
            .orElseThrow(() -> new ItemNotFoundException("Item not found with id: " + itemId));
    }

    @Override
    @Transactional
    public void deleteItem(String itemId) {
        if (!itemRepositery.existsByItemId(itemId)) {
            throw new ItemNotFoundException("Item not found with id: " + itemId);
        }
        

        String imgUrl = getItem(itemId).getImgUrl();
        if (imgUrl != null && !imgUrl.isEmpty()) {
            
            boolean isDeleted = fileUplodeImple.deleteFile(imgUrl);
            
            if (!isDeleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image!!");
            }
        }
    

        itemRepositery.deleteByItemId(itemId);
    }

    @Override
    public ItemResponse updateItem(UpdateItemRequest request, String itemId, MultipartFile file) {
        if (itemId == null || itemId.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Item ID is required for update.");
        }

        ItemEntity existingItem = Optional.ofNullable(itemRepositery.findByItemId(itemId))
                .orElseThrow(() -> new ItemNotFoundException("Item not found with id: " + itemId));

        if (file != null && !file.isEmpty()) {
            boolean isDeleted = fileUplodeImple.deleteFile(existingItem.getImgUrl());
            if (!isDeleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image!!");
            }

            String imgUrl = fileUplodeImple.uplodeFile(file);
            existingItem.setImgUrl(imgUrl);
            
        }

        existingItem.setName(request.getName());
        existingItem.setDescription(request.getDescription());
        existingItem.setPrice(request.getPrice());
        existingItem.setUpdatedAt(LocalDateTime.now());

        existingItem = itemRepositery.save(existingItem);
        return convertToResponse(existingItem);

    }


    private ItemResponse convertToResponse(ItemEntity itemEntity) {
        return ItemResponse.builder()
                .itemId(itemEntity.getItemId())
                .name(itemEntity.getName())
                .description(itemEntity.getDescription())
                .price(itemEntity.getPrice())
                .categoryName(itemEntity.getCategory().getName())
                .imgUrl(itemEntity.getImgUrl())
                .createdAt(itemEntity.getCreatedAt())
                .updatedAt(itemEntity.getUpdatedAt())
                .build();
    }            

    private ItemEntity convertToEntity(ItemRequest itemRequest) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(itemRequest.getName())
                .description(itemRequest.getDescription())
                .price(itemRequest.getPrice())
                .build();
    }

    


}
