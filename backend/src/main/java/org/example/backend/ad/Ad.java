package org.example.backend.ad;

import lombok.Builder;
import lombok.With;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@With
public record Ad(
        @Id String id,
        String userId,
        List<String> images,
        String description,
        double price,
        AdStatus status,
        LocalDateTime createdAt,
        //auto
        String brand,
        String model,
        int year,
        int mileage,
        String fuel,
        String transmission,
        String location
) {}
