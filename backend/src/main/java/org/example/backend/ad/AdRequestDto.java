package org.example.backend.ad;

public record AdRequestDto(
        String description,
        double price,
        String brand,
        String model,
        int year,
        int mileage,
        String fuel,
        String transmission,
        String location
) {
}
