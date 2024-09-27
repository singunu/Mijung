package com.example.mijung.common.dto;

import com.example.mijung.recipe.entity.Recipe;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecipeListResponse {
    private final Integer recipeId;
    private final String name;
    private final String kind;
    private final String image;

    public static RecipeListResponse test(Integer recipeId) {
        return RecipeListResponse.builder()
                .recipeId(recipeId)
                .name("감자탕")
                .kind("국/탕")
                .image("https://picsum.photos/250/250")
                .build();
    }

    public static RecipeListResponse of(Recipe recipe) {
        return RecipeListResponse.builder()
                .recipeId(recipe.getId())
                .name(recipe.getName())
                .kind(recipe.getKind().getDisplayName())
                .image(recipe.getImage())
                .build();
    }
}
