package org.example.backend.ad;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {

    private final AdService adService;

    @GetMapping
    public List<Ad> getAds(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year
    ) {
        return adService.filter(brand, model, year);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getAd(@PathVariable String id) {
        Ad ad = adService.getAdById(id);
        return ResponseEntity.ok(ad);
    }

    @GetMapping("/user")
    public List<Ad> getAdsByUserId(@AuthenticationPrincipal OAuth2User user,
                                   @RequestParam(required = false) AdStatus status) {
        return adService.getAdsByUserIdAndStatus(user.getName(), status);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Ad> createAd(
            @RequestPart("data") AdRequestDto dto,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages,
            @AuthenticationPrincipal OAuth2User user
    ) {
        String userId = user.getName();
        Ad ad = adService.createAd(dto, newImages, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(ad);
    }

    @PutMapping("/{id}")
    public Ad updateAd(
            @PathVariable String id,
            @RequestPart("data") AdRequestDto dto,
            @RequestPart(value = "newImages", required = false) List<MultipartFile> newImages
    ) {
        return adService.updateAd(id, dto, newImages);
    }

    @PatchMapping("/{id}/{status}")
    public Ad updateAdStatus(
            @PathVariable String id,
            @PathVariable AdStatus status,
            @AuthenticationPrincipal OAuth2User user) {

        return adService.updateAdStatus(id, user.getName(), status);
    }

}
