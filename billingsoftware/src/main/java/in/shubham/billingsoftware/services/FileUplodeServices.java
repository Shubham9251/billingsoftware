package in.shubham.billingsoftware.services;

import org.springframework.web.multipart.MultipartFile;

public interface FileUplodeServices {
    String uplodeFile(MultipartFile file);

    boolean deleteFile(String imgUrl);
}
