package com.example.mijung.recipe.repository;

import com.example.mijung.recipe.entity.Recipe;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    List<Recipe> findByMaterialsIngredientId(Integer ingredientId);
}
