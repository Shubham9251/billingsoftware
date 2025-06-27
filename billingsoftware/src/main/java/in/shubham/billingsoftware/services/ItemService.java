package in.shubham.billingsoftware.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import in.shubham.billingsoftware.io.ItemRequest;
import in.shubham.billingsoftware.io.ItemResponse;
import in.shubham.billingsoftware.io.UpdateItemRequest;

public interface ItemService {

    ItemResponse createItem(ItemRequest request, MultipartFile file);

    List<ItemResponse> getItems();

    ItemResponse getItem(String itemId);

    void deleteItem(String itemId);

    ItemResponse updateItem(UpdateItemRequest request, String itemId, MultipartFile file);
}
