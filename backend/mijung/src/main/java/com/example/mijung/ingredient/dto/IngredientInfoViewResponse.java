package com.example.mijung.ingredient.dto;

import com.example.mijung.ingredient.entity.Ingredient;
import com.example.mijung.ingredient.entity.IngredientInfo;
import com.example.mijung.ingredient.entity.IngredientRate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IngredientInfoViewResponse {
    private final Integer ingredientId;
    private final String name;
    private final String retailUnit;
    private final String retailUnitsize;
    private final String image;
    private final Integer price;
    private final Float changeRate;
    private final Integer changePrice;

    public static IngredientInfoViewResponse test(Integer ingredientId, String category) {
        return IngredientInfoViewResponse.builder()
                .ingredientId(ingredientId)
                .name("감자" + category)
                .retailUnit("kg")
                .retailUnitsize("20")
                .image("https://recipe1.ezmember.co.kr/cache/bbs/2016/08/25/e1ecc151809f90a265886b51e9a44bd9.jpg")
                .price(900)
                .changeRate((float) 5)
                .changePrice(3)
                .build();
    }

    public static IngredientInfoViewResponse of(Ingredient ingredient) {
        return IngredientInfoViewResponse.builder()
                .ingredientId(ingredient.getId())
                .name(ingredient.getItemName())
                .image(ingredient.getImage())
                .build();
    }

    public static IngredientInfoViewResponse of(Ingredient ingredient, Integer price, Float changeRate, Integer changePrice) {
        return IngredientInfoViewResponse.builder()
                .ingredientId(ingredient.getId())
                .name(ingredient.getItemName())
                .retailUnit(ingredient.getRetailUnit())
                .retailUnitsize(ingredient.getRetailUnitsize())
                .image(ingredient.getImage())
                .price(price)
                .changeRate(changeRate)
                .changePrice(changePrice)
                .build();
    }
}
