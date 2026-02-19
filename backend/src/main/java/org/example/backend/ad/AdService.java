package org.example.backend.ad;

import lombok.RequiredArgsConstructor;
import org.example.backend.cloudinary.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final CloudinaryService cloudinaryService;

    public List<Ad> filter(String brand, String model, Integer year) {
        if (brand != null && model != null && year != null) {
            return adRepository.findByBrandAndModelAndYear(brand, model, year);
        }
        if (brand != null && model != null) {
            return adRepository.findByBrandAndModel(brand, model);
        }
        if (brand != null) {
            return adRepository.findByBrand(brand);
        }
        return adRepository.findAll();
    }

    public Ad createAd(AdRequestDto dto,
                       List<MultipartFile> files,
                       String userId) {
        List<String> imageUrls = new ArrayList<>();

        if (files != null) {
            for (MultipartFile file : files) {
                String url = cloudinaryService.uploadImage(file);
                imageUrls.add(url);
            }
        }

        Ad ad = Ad.builder()
                .userId(userId)
                .images(imageUrls)
                .description(dto.description())
                .price(dto.price())
                .brand(dto.brand())
                .model(dto.model())
                .year(dto.year())
                .mileage(dto.mileage())
                .fuel(dto.fuel())
                .transmission(dto.transmission())
                .build();

        return adRepository.save(ad);
    }
}
