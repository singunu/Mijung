package com.example.mijung.ingredient.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IngredientSearchResponse {
    private final Integer ingredientId;
    private final String name;

    public static IngredientSearchResponse of(Integer ingredientId, String name) {
        return IngredientSearchResponse.builder()
                .ingredientId(ingredientId)
                .name(name + ingredientId)
                .build();
    }
}
