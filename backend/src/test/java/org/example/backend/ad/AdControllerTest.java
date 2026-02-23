package org.example.backend.ad;

import org.example.backend.exceptions.NotFoundException;
import org.example.backend.security.CustomOAuth2UserService;
import org.example.backend.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AdController.class)
@Import(SecurityConfig.class)
class AdControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    AdService adService;

    @MockitoBean
    CustomOAuth2UserService customOAuth2UserService;

    @Test
    @DisplayName("GET /api/ads returns filtered ads")
    void getAds() throws Exception {

        Ad ad = Ad.builder().brand("BMW").model("X5").year(2022).build();

        when(adService.filter("BMW", null, null))
                .thenReturn(List.of(ad));

        mockMvc.perform(get("/api/ads")
                        .param("brand", "BMW"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("BMW"));
    }

    @Test
    @DisplayName("POST /api/ads creates new ad")
    void createAd() throws Exception {
        Ad ad = Ad.builder().brand("BMW").model("X5").build();

        when(adService.createAd(any(), any(), any()))
                .thenReturn(ad);

        MockMultipartFile json = new MockMultipartFile(
                "data",
                null,
                MediaType.APPLICATION_JSON_VALUE,
                """
                    {
                        "description": "desc",
                        "price": 10000,
                        "brand": "BMW",
                        "model": "X5",
                        "year": 2022,
                        "mileage": 50000,
                        "fuel": "Diesel",
                        "transmission": "Automatic"
                    }
                """.getBytes());


        MockMultipartFile file =
                new MockMultipartFile(
                        "files",
                        "image.jpg",
                        MediaType.IMAGE_JPEG_VALUE,
                        "image".getBytes()
                );

        mockMvc.perform(multipart("/api/ads")
                        .file(json)
                        .file(file)
                        .with(oauth2Login()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.brand").value("BMW"))
                .andExpect(jsonPath("$.model").value("X5"));
    }

    @Test
    @DisplayName("Should return ad by Id")
    void getAdById() throws Exception {
        //Given
        String id = "1";
        Ad ad = new Ad(id, "user1", List.of(), "desc", 10000,
                "BMW", "X5", 2022, 50000,
                "Diesel", "Automatic", "Germany");
        when(adService.getAdById(id)).thenReturn(ad);

        //When + Then
        mockMvc.perform(get("/api/ads/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.description").value("desc"))
                .andExpect(jsonPath("$.brand").value("BMW"))
                .andExpect(jsonPath("$.model").value("X5"));
    }

    @Test
    @DisplayName("Should return 404 when ad with Id Not Found")
    void getAdById_shouldReturn404() throws Exception {
        //Given
        String id = "1";
        when(adService.getAdById(id))
                .thenThrow(new NotFoundException("Ad with id " + id + " does not exist"));
        //When + Then

        mockMvc.perform(get("/api/ads/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.errorCode").value(HttpStatus.NOT_FOUND.value()))
                .andExpect(jsonPath("$.errorMessage").value("Ad with id " + id + " does not exist"));
    }
}
