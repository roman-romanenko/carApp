package org.example.backend.ad;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends MongoRepository<Ad, String> {
    List<Ad> findByBrandContainingIgnoreCase(String brand);
    List<Ad> findByModelContainingIgnoreCase(String model);
    List<Ad> findByYear(Integer year);
    List<Ad> findByBrandContainingIgnoreCaseAndModelContainingIgnoreCase(
            String brand,
            String model
    );
    List<Ad> findByBrandContainingIgnoreCaseAndModelContainingIgnoreCaseAndYear(
            String brand,
            String model,
            Integer year
    );
}
