package org.example.backend.user;

import lombok.Builder;

import java.util.List;

@Builder
public record UserDto(
        String username,
        String avatarUrl,
        String firstName,
        String lastName,
        String phone,

        List<String> favoriteAdIds
) {}
