package org.example.backend.ad;

import lombok.RequiredArgsConstructor;
import org.example.backend.cloudinary.CloudinaryService;
import org.example.backend.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdService {
    private final AdRepository adRepository;
    private final CloudinaryService cloudinaryService;

    public List<Ad> filter(String brand, String model, Integer year) {
        String cleanBrand = normalize(brand);
        String cleanModel = normalize(model);

        boolean hasBrand = cleanBrand != null;
        boolean hasModel = cleanModel != null;
        boolean hasYear = year != null;

        if (hasBrand && hasModel && hasYear) {
            return adRepository
                    .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndYearAndStatus(
                            cleanBrand, cleanModel, year, AdStatus.ACTIVE
                    );
        }

        if (hasBrand && hasModel) {
            return adRepository
                    .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndStatus(
                            cleanBrand, cleanModel, AdStatus.ACTIVE
                    );
        }

        if (hasBrand) {
            return adRepository.findByBrandContainingIgnoreCaseAndStatus(cleanBrand, AdStatus.ACTIVE);
        }

        if (hasModel) {
            return adRepository.findByModelContainingIgnoreCaseAndStatus(cleanModel, AdStatus.ACTIVE);
        }

        if (hasYear) {
            return adRepository.findByYearAndStatus(year, AdStatus.ACTIVE);
        }

        return adRepository.findByStatus(AdStatus.ACTIVE);
    }

    private String normalize(String value) {
        if (value == null) return null;

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }


    public Ad getAdById(String id) {
        return adRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Ad with id " + id + " does not exist"));
    }


    public List<Ad> getAdsByUserId(String userId) {
        return adRepository.findByUserId(userId);
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

        String location = dto.zip() + " " + dto.city()  + ", " + dto.country();

        Ad ad = Ad.builder()
                .userId(userId)
                .images(imageUrls)
                .description(dto.description())
                .price(dto.price())
                .status(AdStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .brand(dto.brand())
                .model(dto.model())
                .year(dto.year())
                .mileage(dto.mileage())
                .fuel(dto.fuel())
                .transmission(dto.transmission())
                .location(location)
                .build();

        return adRepository.save(ad);
    }

    public Ad updateAd(String id,
                       AdRequestDto dto,
                       List<MultipartFile> newImages) {
        Ad ad = getAdById(id);
        List<String> finalImages = new ArrayList<>();
        int newImageIndex = 0;

        for (String item : dto.images()) {
            if (item.startsWith("new_")) {
                MultipartFile file = newImages.get(newImageIndex);
                String url = cloudinaryService.uploadImage(file);
                finalImages.add(url);
                newImageIndex++;
            } else {
                finalImages.add(item);
            }
        }

        return adRepository.save(ad
                .withMileage(dto.mileage())
                .withDescription(dto.description())
                .withPrice(dto.price())
                .withImages(finalImages)
        );

    }
}
