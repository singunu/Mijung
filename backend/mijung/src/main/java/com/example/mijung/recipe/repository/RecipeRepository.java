package com.example.mijung.recipe.repository;

import com.example.mijung.recipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {
    Page<Recipe> findByNameContaining(String keyword, Pageable pageable);
}
