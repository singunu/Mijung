package com.example.mijung.ingredient.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.mijung.common.dto.RecipeListResponse;
import com.example.mijung.ingredient.entity.Ingredient;
import com.example.mijung.ingredient.repository.IngredientRepository;
import com.example.mijung.recipe.entity.CookingTime;
import com.example.mijung.recipe.entity.Inbun;
import com.example.mijung.recipe.entity.Kind;
import com.example.mijung.recipe.entity.Level;
import com.example.mijung.recipe.entity.Recipe;
import com.example.mijung.recipe.repository.RecipeRepository;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
public class GetIngredientRecommendRecipeTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @Test
    @DisplayName("색재료 추천 레시피 조회 테스트 - 성공 : 식재료가 들어간 레시피가 있는 경우")
    public void getIngredientInfo_IsPricedTrue() {
        // Given
        Integer ingredientId = 1;  // 테스트할 식재료 ID
        Ingredient ingredient = Ingredient.builder()
                .id(ingredientId)
                .itemName("쌀")
                .build();

        List<Recipe> recipes = Arrays.asList(
                new Recipe(1, "Recipe 1", 0, 0, Kind.SOUP_STEW, Inbun.ONE, Level.ANYONE, CookingTime.WITHIN_10_MINUTES,
                        null),
                new Recipe(2, "Recipe 2", 0, 0, Kind.WESTERN, Inbun.TWO, Level.BEGINNER, CookingTime.WITHIN_20_MINUTES,
                        null)
        );

        given(ingredientRepository.findById(ingredientId)).willReturn(Optional.of(ingredient));
        given(recipeRepository.findByMaterialsIngredientId(ingredientId)).willReturn(recipes);

        // When
        List<RecipeListResponse> result = ingredientService.getIngredientRecommendRecipe(ingredientId);

        // Then
        assertNotNull(result);
        assertTrue(result.size() <= recipes.size());
        verify(ingredientRepository).findById(ingredientId);
        verify(recipeRepository).findByMaterialsIngredientId(ingredientId);
    }

    @Test
    @DisplayName("색재료 추천 레시피 조회 테스트 - 성공 : 식재료가 들어간 레시피가 없는 경우")
    public void getIngredientInfo_IsPricedFalse() {
        // Given
        Integer ingredientId = 2;  // 테스트할 식재료 ID
        Ingredient ingredient = Ingredient.builder()
                .id(ingredientId)
                .itemName("감자")
                .build();

        when(ingredientRepository.findById(ingredientId)).thenReturn(Optional.of(ingredient));
        given(recipeRepository.findByMaterialsIngredientId(ingredientId)).willReturn(new ArrayList<Recipe>());

        // When
        List<RecipeListResponse> result = ingredientService.getIngredientRecommendRecipe(ingredientId);
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("색재료 추천 레시피 조회 테스트 - 실패 : 식재료가 없는 경우")
    void getIngredientRecommendRecipe_NotFound_Fail() {
        // Given
        Integer nonExistentId = 9999;
        when(ingredientRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResponseStatusException.class,
                () -> ingredientService.getIngredientRecommendRecipe(nonExistentId));
    }
}
