package org.example.backend.user;

import lombok.Builder;

@Builder
public record UserAdInfoDto(
        String username,
        String avatarUrl,
        String firstName,
        String lastName,
        String phone
) {}
