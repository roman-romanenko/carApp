package org.example.backend.ad;

import org.example.backend.cloudinary.CloudinaryService;
import org.example.backend.exceptions.NotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdServiceTest {

    @Mock
    AdRepository adRepository;

    @Mock
    CloudinaryService cloudinaryService;

    @InjectMocks
    AdService adService;

    @Test
    @DisplayName("Filter by brand, model and year")
    void filter() {
        Ad ad = Ad.builder().brand("BMW").model("X5").year(2022).build();

        when(adRepository.findByBrandAndModelAndYear("BMW", "X5", 2022))
                .thenReturn(List.of(ad));

        List<Ad> result = adService.filter("BMW", "X5", 2022);

        assertThat(result).hasSize(1);
        verify(adRepository).findByBrandAndModelAndYear("BMW", "X5", 2022);
    }

    @Test
    @DisplayName("Create ad without images")
    void createAd_WithoutImages() {
        AdRequestDto dto = new AdRequestDto(
                "desc", 10000, "BMW", "X5", 2022,
                50000, "Diesel", "Automatic", "42285", "Germany", "Wuppertal"
        );

        when(adRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        Ad ad = adService.createAd(dto, null, "user1");

        assertThat(ad.images()).isEmpty();
        assertThat(ad.userId()).isEqualTo("user1");
        verify(adRepository).save(any());
    }

    @Test
    @DisplayName("Create ad with images")
    void createAd_WithImages() {
        MultipartFile file = mock(MultipartFile.class);

        when(cloudinaryService.uploadImage(file))
                .thenReturn("http://image-url");

        when(adRepository.save(any()))
                .thenAnswer(i -> i.getArgument(0));

        AdRequestDto dto = new AdRequestDto(
                "desc", 10000, "BMW", "X5", 2022,
                50000, "Diesel", "Automatic", "42285", "Germany", "Wuppertal"
        );

        Ad ad = adService.createAd(dto, List.of(file), "user1");

        assertThat(ad.images()).hasSize(1);
        assertThat(ad.images().get(0)).isEqualTo("http://image-url");

        verify(cloudinaryService).uploadImage(file);
        verify(adRepository).save(any());
    }

    @Test
    @DisplayName("Should return ad by id")
    void getAdById() {
        //Given
        String id = UUID.randomUUID().toString();
        Ad newAd = new Ad(id,  "userID", List.of("imageUrl"), "desc", 10000, "BMW", "X5", 2022,
                50000, "Diesel", "Automatic", "Germany");
        when(adRepository.findById(id)).thenReturn(Optional.of(newAd));

        //When
        Ad ad = adService.getAdById(id);

        //Then
        assertThat(ad).isEqualTo(newAd);
        verify(adRepository).findById(id);
    }

    @Test
    @DisplayName("Should return error when ad with id does not exist")
    void getAdById_returnError_whenAdWithIdDoesNotExist() {
        //Given
        String id = UUID.randomUUID().toString();
        when(adRepository.findById(id)).thenReturn(Optional.empty());

        //When + Then
        NotFoundException exception = assertThrows(
                NotFoundException.class,
                () -> adService.getAdById(id)
        );

        assertThat(exception.getMessage())
                .isEqualTo("Ad with id " + id + " does not exist");
        verify(adRepository).findById(id);
    }
}
