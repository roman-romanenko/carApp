package org.example.backend.user;

import org.example.backend.ad.Ad;
import org.example.backend.ad.AdRepository;
import org.example.backend.ad.AdStatus;
import org.example.backend.exceptions.NotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private AdRepository adRepository;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Should Update user fields")
    void updateUser() {
        User user = User.builder()
                .id("1")
                .firstName("Old")
                .lastName("Name")
                .phone("123")
                .favoriteAdIds(new ArrayList<>())
                .build();

        UserDto dto = UserDto.builder()
                .firstName("New")
                .lastName("Surname")
                .phone("999")
                .build();

        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        User updatedUser = userService.updateUser("1", dto);

        assertThat(updatedUser.firstName()).isEqualTo("New");
        assertThat(updatedUser.lastName()).isEqualTo("Surname");
        assertThat(updatedUser.phone()).isEqualTo("999");
    }

    @Test
    @DisplayName("Should Add Ad to favorites if not present")
    void toggleFavorite_IfNotPresent() {
        List<String> favorites = new ArrayList<>();
        User user = User.builder()
                .id("1")
                .favoriteAdIds(favorites)
                .build();

        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        userService.toggleFavorite("ad1", "1");

        assertThat(user.favoriteAdIds()).contains("ad1");
        verify(userRepository).save(user);
    }

    @Test
    @DisplayName("Should Remove Ad from favorites if present")
    void toggleFavorite_IfPresent() {
        List<String> favorites = new ArrayList<>(List.of("ad1"));
        User user = User.builder()
                .id("1")
                .favoriteAdIds(favorites)
                .build();

        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        userService.toggleFavorite("ad1", "1");

        assertThat(user.favoriteAdIds()).doesNotContain("ad1");
        verify(userRepository).save(user);
    }

    @Test
    @DisplayName("Should Return favorites Ads")
    void getFavoriteAds() {
        User user = User.builder()
                    .id("1")
                    .favoriteAdIds(List.of("ad1"))
                    .build();

        Ad ad = Ad.builder()
                .id("ad1")
                .brand("BMW")
                .model("X5")
                .year(2022)
                .status(AdStatus.ACTIVE)
                .build();
        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(adRepository.findAllByIdIn(List.of("ad1")))
                .thenReturn(List.of(ad));

        List<Ad> result = userService.getFavoriteAds("1");

        assertThat(result).hasSize(1);
    }

    @Test
    @DisplayName("Should Throw Error if User Not found")
    void getUserById_shouldThrowIfNotFound() {
        when(userRepository.findById("1")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.updateUser("1", UserDto.builder().build()))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    @DisplayName("Should return User Ad Info Dto")
     void getUserAdInfoDtoById() {
        User user = User.builder()
                .id("1")
                .lastName("Name")
                .firstName("First")
                .phone("999")
                .avatarUrl("avatarUrl")
                .favoriteAdIds(List.of("ad1"))
                .build();

        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        UserAdInfoDto result = userService.getUserAdInfoDtoById("1");

        assertThat(result).isNotNull();
        assertThat(result.firstName()).isEqualTo("First");
        assertThat(result.lastName()).isEqualTo("Name");
        assertThat(result.phone()).isEqualTo("999");
        assertThat(result.avatarUrl()).isEqualTo("avatarUrl");
    }
}