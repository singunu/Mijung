package com.example.mijung.recipe.enums;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RecipeMassage {
    RECIPE_NOT_FOUND("Recipe not found");
    private String message;
}
