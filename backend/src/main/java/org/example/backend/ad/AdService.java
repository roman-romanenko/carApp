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
            return sortByCreatedAt(
                        adRepository
                        .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndYearAndStatus(
                                cleanBrand, cleanModel, year, AdStatus.ACTIVE
                        )
                    );
        }

        if (hasBrand && hasModel) {
            return sortByCreatedAt(adRepository
                    .findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndStatus(
                            cleanBrand, cleanModel, AdStatus.ACTIVE
                    ));
        }

        if (hasBrand) {
            return sortByCreatedAt(adRepository.findByBrandContainingIgnoreCaseAndStatus(cleanBrand, AdStatus.ACTIVE));
        }

        if (hasModel) {
            return sortByCreatedAt(adRepository.findByModelContainingIgnoreCaseAndStatus(cleanModel, AdStatus.ACTIVE));
        }

        if (hasYear) {
            return sortByCreatedAt(adRepository.findByYearAndStatus(year, AdStatus.ACTIVE));
        }

        return sortByCreatedAt(adRepository.findByStatus(AdStatus.ACTIVE));
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
        return sortByCreatedAt(adRepository.findByUserId(userId));
    }

    public List<Ad> getAdsByUserIdAndStatus(String userId, AdStatus status) {
        if (status != null) {
            return sortByCreatedAt(adRepository.findByUserIdAndStatus(userId, status));
        }

        return this.getAdsByUserId(userId);
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

    public Ad updateAdStatus(String adId, String userId, AdStatus status) {
        Ad ad = adRepository.findById(adId)
                .orElseThrow(() -> new NotFoundException("Ad not found"));

//        if (!ad.userId().equals(userId)) {
//            throw new ForbiddenException("You cannot change this ad");
//        }

        return adRepository.save(ad.withStatus(status));
    }

    private List<Ad> sortByCreatedAt(List<Ad> ads) {
        return ads.stream()
                .sorted((a, b) -> {
                    if (a.createdAt() == null && b.createdAt() == null) return 0;
                    if (a.createdAt() == null) return 1;
                    if (b.createdAt() == null) return -1;
                    return b.createdAt().compareTo(a.createdAt());
                })
                .toList();
    }
}
