package org.example.backend.user;

import lombok.RequiredArgsConstructor;
import org.example.backend.ad.Ad;
import org.example.backend.ad.AdRepository;
import org.example.backend.exceptions.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AdRepository adRepository;

    private User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public User updateUser(String id, UserDto dto) {
        User user = getUserById(id);

        return userRepository.save(
                user
                    .withFirstName(dto.firstName() != null ? dto.firstName() : user.firstName())
                    .withLastName(dto.lastName() != null ? dto.lastName() : user.lastName())
                    .withPhone(dto.phone() != null ? dto.phone() : user.phone())
        );
    }

    public List<String> toggleFavorite(String adId, String userId) {
        User user = getUserById(userId);

        if (user.favoriteAdIds().contains(adId)) {
            user.favoriteAdIds().remove(adId);
        } else {
            user.favoriteAdIds().add(adId);
        }

        userRepository.save(user);

        return user.favoriteAdIds();
    }

    public List<Ad> getFavoriteAds(String userId) {
        User user = getUserById(userId);

        return adRepository.findAllByIdIn(user.favoriteAdIds());
    }

    public UserAdInfoDto getUserAdInfoDtoById(String id) {
        User user = getUserById(id);

        return UserAdInfoDto.builder()
                .firstName(user.firstName())
                .lastName(user.lastName())
                .phone(user.phone())
                .username(user.username())
                .avatarUrl(user.avatarUrl())
                .build();
    }
}