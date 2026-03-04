package org.example.backend.ad;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends MongoRepository<Ad, String> {
    List<Ad> findByBrandContainingIgnoreCaseAndStatus(String brand, AdStatus status);
    List<Ad> findByModelContainingIgnoreCaseAndStatus(String model, AdStatus status);
    List<Ad> findByYearAndStatus(Integer year, AdStatus status);
    List<Ad> findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndStatus(
            String brand,
            String model,
            AdStatus status
    );
    List<Ad> findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndYearAndStatus(
            String brand,
            String model,
            Integer year,
            AdStatus status
    );
    List<Ad> findByUserId(String userId);
    List<Ad> findByStatus(AdStatus status);
    List<Ad> findAllByIdIn(List<String> ids);
}
