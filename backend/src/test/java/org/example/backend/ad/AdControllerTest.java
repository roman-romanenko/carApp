package org.example.backend.ad;

import org.example.backend.security.CustomOAuth2UserService;
import org.example.backend.security.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
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

        Mockito.when(adService.filter("BMW", null, null))
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

        Mockito.when(adService.createAd(any(), any(), any()))
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
}
