package org.example.backend.ad;

import lombok.Builder;

import java.util.List;

@Builder
public record AdRequestDto(
        String description,
        double price,
        String brand,
        String model,
        int year,
        int mileage,
        String fuel,
        String transmission,
        String zip,
        String country,
        String city,
        List<String> images
) {
}
