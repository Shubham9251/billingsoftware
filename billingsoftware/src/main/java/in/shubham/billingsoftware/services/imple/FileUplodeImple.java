package in.shubham.billingsoftware.services.imple;

import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import in.shubham.billingsoftware.services.FileUplodeServices;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUplodeImple implements FileUplodeServices {


    private final Cloudinary cloudinary;

    @Override
    public String uplodeFile(MultipartFile file) {
        
        // String filenameExtension = Optional.ofNullable(file.getOriginalFilename())
        //         .map(filename -> filename.substring(filename.lastIndexOf(".")+1))
        //         .orElseThrow(() -> new IllegalArgumentException("File name is not valid"));
        
        String key = UUID.randomUUID().toString();

        try {
            
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), 
            ObjectUtils.asMap(
                "folder", "billing_app",
                "public_id", key, // this names it: billing_app/{key}.{ext}
                "resource_type", "image"
            ));

            String url = (String) uploadResult.get("secure_url");
            if (url == null) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
            }

            return url;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File upload failed", e);
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        System.out.println(imgUrl);
        
        // Extract the public ID from the URL (assumes format: .../billing_app/{publicId}.{ext})
        String fileNameWithExt = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
        int dotIndex = fileNameWithExt.lastIndexOf('.');
        if (dotIndex == -1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid image URL: no file extension found");
        }
        String publicId = "billing_app/" + fileNameWithExt.substring(0, dotIndex);

        try {
            System.out.println(publicId);
            @SuppressWarnings("unchecked")
            Map<String, Object> deleteResult = cloudinary.uploader().destroy(publicId, 
            ObjectUtils.asMap(
                "resource_type", "image"
            ));
            
            System.out.println(deleteResult);
            String result = (String) deleteResult.get("result");
            System.out.println(result);
            return "ok".equals(result);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "File deletion failed", e);
        }
    }
}
