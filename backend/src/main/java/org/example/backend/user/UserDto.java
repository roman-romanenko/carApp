package org.example.backend.user;

import lombok.Builder;

@Builder
public record UserDto(
        String username,
        String avatarUrl
) {}
