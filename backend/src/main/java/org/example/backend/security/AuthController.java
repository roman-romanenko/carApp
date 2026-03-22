package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.exceptions.NotFoundException;
import org.example.backend.user.User;
import org.example.backend.user.UserDto;
import org.example.backend.user.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/currentUser")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @GetMapping
    public UserDto getCurrentUser(@AuthenticationPrincipal OAuth2User oAuth2User) {
        if (oAuth2User == null) {
            return null;
        }

        String userId = oAuth2User.getName();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return UserDto.builder()
                .username(user.username())
                .avatarUrl(user.avatarUrl())
                .firstName(user.firstName())
                .lastName(user.lastName())
                .phone(user.phone())
                .favoriteAdIds(user.favoriteAdIds())
                .build();
    }
}
