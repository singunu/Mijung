package com.example.mijung.common.dto;

import com.example.mijung.recipe.entity.Recipe;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "레시피 응답")
public class RecipeListResponse {

    @Schema(description = "레시피 ID", example = "1")
    private final Integer recipeId;

    @Schema(description = "요리명", example = "감자탕")
    private final String name;

    @Schema(description = "요리 종류", example = "국/탕")
    private final String kind;

    @Schema(description = "이미지 링크", example = "https://picsum.photos/250/250")
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
