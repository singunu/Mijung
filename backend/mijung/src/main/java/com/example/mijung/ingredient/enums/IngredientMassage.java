package com.example.mijung.ingredient.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum IngredientMassage {
    INGREDIENT_NOT_FOUND("Ingredient not found."),
    CATEGORY_NOT_FOUND("Category not found.");
    private final String message;
}
