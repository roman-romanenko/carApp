package org.example.backend.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class CloudinaryServiceTest {

    @Test
    @DisplayName("Upload image returns secure_url")
    void uploadImage() throws Exception {

        Cloudinary cloudinary = mock(Cloudinary.class);
        Uploader uploader = mock(Uploader.class);
        MultipartFile file = mock(MultipartFile.class);

        when(cloudinary.uploader()).thenReturn(uploader);
        when(file.getBytes()).thenReturn("image".getBytes());
        when(uploader.upload(any(), any()))
                .thenReturn(Map.of("secure_url", "http://image-url"));

        CloudinaryService service = new CloudinaryService(cloudinary);

        String result = service.uploadImage(file);

        assertThat(result).isEqualTo("http://image-url");
    }
}
