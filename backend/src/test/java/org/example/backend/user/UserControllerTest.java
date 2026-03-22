package org.example.backend.user;

import org.example.backend.ad.Ad;
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
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    CustomOAuth2UserService customOAuth2UserService;

    @Test
    @DisplayName("GET /api/user/favorites returns favorite ads")
    void getFavorites() throws Exception {
        String userId = "1";

        Ad ad = Ad.builder()
                .id("ad1")
                .userId(userId)
                .brand("BMW")
                .model("X5")
                .build();

        when(userService.getFavoriteAds(userId))
                .thenReturn(List.of(ad));

        mockMvc.perform(get("/api/user/favorites")
                        .with(oauth2Login()
                                .attributes(attrs -> attrs.put("sub", userId))
                        )
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].id").value("ad1"))
                .andExpect(jsonPath("$.[0].brand").value("BMW"))
                .andExpect(jsonPath("$.[0].model").value("X5"));
    }

    @Test
    @DisplayName("POST /api/user/favorites/{id} toggles favorite")
    void toggleFavorite() throws Exception {

        String userId = "1";

        mockMvc.perform(post("/api/user/favorites/ad1")
                        .with(oauth2Login().attributes(a -> a.put("sub", userId))))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("PUT /api/user updates user")
    void updateUser() throws Exception {
        String userId = "1";
        User updatedUser = User.builder()
                .id(userId)
                .firstName("Max")
                .lastName("Mustermann")
                .phone("123456")
                .build();

        when(userService.updateUser(eq(userId), any()))
                .thenReturn(updatedUser);

        mockMvc.perform(put("/api/user")
                        .with(oauth2Login().attributes(a -> a.put("sub", userId)))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "firstName": "Max",
                                    "lastName": "Mustermann",
                                    "phone": "123456"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Max"))
                .andExpect(jsonPath("$.lastName").value("Mustermann"))
                .andExpect(jsonPath("$.phone").value("123456"));
    }

    @Test
    @DisplayName("GET /api/user/favorites should return 404 if user not found")
    void getFavorites_shouldReturn404() throws Exception {

        String userId = "1";

        when(userService.getFavoriteAds(userId))
                .thenThrow(new NotFoundException("User not found"));

        mockMvc.perform(get("/api/user/favorites")
                        .with(oauth2Login().attributes(a -> a.put("sub", userId))))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.errorCode").value(HttpStatus.NOT_FOUND.value()))
                .andExpect(jsonPath("$.errorMessage").value("User not found"));
    }


    @Test
    @DisplayName("GET /api/user/{id}/ad/info should return User Ad Info Dto")
    void getUserAdInfoById() throws Exception {
        UserAdInfoDto userAdInfoDto = UserAdInfoDto.builder()
                .lastName("Name")
                .firstName("First")
                .phone("999")
                .avatarUrl("avatarUrl")
                .build();

        when(userService.getUserAdInfoDtoById("1")).thenReturn(userAdInfoDto);

        mockMvc.perform(get("/api/user/{id}/ad/info", 1))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("First"))
                .andExpect(jsonPath("$.lastName").value("Name"))
                .andExpect(jsonPath("$.phone").value("999"))
                .andExpect(jsonPath("$.avatarUrl").value("avatarUrl"));

        verify(userService, times(1)).getUserAdInfoDtoById("1");
    }
}