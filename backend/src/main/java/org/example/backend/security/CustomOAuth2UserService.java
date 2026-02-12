package org.example.backend.security;

import lombok.RequiredArgsConstructor;
import org.example.backend.user.User;
import org.example.backend.user.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User);

        User user = userRepository.findById(oAuth2User.getName())
                .orElseGet(() -> createUser(oAuth2User));

        return oAuth2User;
    }

    private User createUser(OAuth2User oAuth2User) {
        User newUser = User.builder()
                .id(oAuth2User.getName())
                .username(oAuth2User.getAttribute("login"))
                .avatarUrl(oAuth2User.getAttribute("avatar_url"))
                .build();

        return userRepository.save(newUser);
    }
}
