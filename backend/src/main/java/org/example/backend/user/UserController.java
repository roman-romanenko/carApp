package org.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.example.backend.ad.Ad;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/favorites")
    public List<Ad> getFavorites(
            @AuthenticationPrincipal OAuth2User user
    ) {
        return userService.getFavoriteAds(user.getName());
    }

    @PostMapping("/favorites/{id}")
    public List<String> toggleFavorite(
            @PathVariable String id,
            @AuthenticationPrincipal OAuth2User user
    ) {
     return userService.toggleFavorite(id, user.getName());
    }

    @GetMapping("/{id}/ad/info")
    public UserAdInfoDto getUserAdInfoById(@PathVariable String id) {
        return userService.getUserAdInfoDtoById(id);
    }

    @PutMapping()
    public User updateUser(
            @AuthenticationPrincipal OAuth2User user,
            @RequestBody UserDto userDto
    ) {
       return userService.updateUser(user.getName(), userDto);
    }
}
