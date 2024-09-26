package com.example.mijung.ingredient.repository;

import com.example.mijung.ingredient.entity.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Page<Ingredient> findByItemCategoryNameContainingAndItemNameContaining(String category, String keyword, Pageable pageable);
}
