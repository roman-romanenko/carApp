package org.example.backend.user;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.List;

@Builder
@With
public record User(
        @Id String id,
        String username,
        String avatarUrl,
        String firstName,
        String lastName,
        String phone,

        List<String> favoriteAdIds
) {
}
