package org.example.backend.ad;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends MongoRepository<Ad, String> {
    List<Ad> findByBrand(String brand);
    List<Ad> findByBrandAndModel(String brand, String model);
    List<Ad> findByBrandAndModelAndYear(String brand, String model, int year);
}
