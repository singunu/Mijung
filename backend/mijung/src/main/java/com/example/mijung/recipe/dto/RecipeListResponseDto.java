package com.example.mijung.recipe.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecipeListResponseDto {
    private final Integer recipeId;
    private final String name;
    private final String kind;
    private final String image;
}
