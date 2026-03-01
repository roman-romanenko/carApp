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
                    .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndYear(
                            cleanBrand, cleanModel, year
                    );
        }

        if (hasBrand && hasModel) {
            return adRepository
                    .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCase(
                            cleanBrand, cleanModel
                    );
        }

        if (hasBrand) {
            return adRepository.findByBrandContainingIgnoreCase(cleanBrand);
        }

        if (hasModel) {
            return adRepository.findByModelContainingIgnoreCase(cleanModel);
        }

        if (hasYear) {
            return adRepository.findByYear(year);
        }

        return adRepository.findAll();
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
}
