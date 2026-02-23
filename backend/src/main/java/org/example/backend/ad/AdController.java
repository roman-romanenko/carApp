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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Ad> createAd(
            @RequestPart("data") AdRequestDto dto,
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @AuthenticationPrincipal OAuth2User user
    ) {
        String userId = user.getName();
        Ad ad = adService.createAd(dto, files, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(ad);
    }
}
