package org.example.backend.user;

import lombok.Builder;
import org.springframework.data.annotation.Id;

@Builder
public record User(
        @Id String id,
        String username,
        String avatarUrl
) {
}
