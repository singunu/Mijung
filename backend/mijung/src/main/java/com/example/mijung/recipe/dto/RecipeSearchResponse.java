package com.example.mijung.recipe.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecipeSearchResponse {
    private final Integer recipeId;
    private final String name;

    public static RecipeSearchResponse of(Integer recipeId, String name) {
        return RecipeSearchResponse.builder()
                .recipeId(recipeId)
                .name(name)
                .build();
    }
}
