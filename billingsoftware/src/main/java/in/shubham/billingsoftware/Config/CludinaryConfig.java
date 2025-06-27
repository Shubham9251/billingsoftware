package in.shubham.billingsoftware.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CludinaryConfig {

    @Value("${cloudinary.cloud.name}")
    private String cloudName;
    @Value("${cloudinary.access.key}")
    private String accessKey;
    @Value("${cloudinary.secret.key}")
    private String secretKey;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", cloudName,
            "api_key", accessKey,
            "api_secret", secretKey,
            "secure", true
        ));
    }
}
