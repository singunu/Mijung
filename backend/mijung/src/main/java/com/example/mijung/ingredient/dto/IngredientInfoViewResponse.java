package com.example.mijung.ingredient.dto;

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

    public static IngredientInfoViewResponse of(Integer ingredientId, String category) {
        return IngredientInfoViewResponse.builder()
                .ingredientId(ingredientId)
                .name("감자 " + category)
                .retailUnit("kg")
                .retailUnitsize("1")
                .image("https://recipe1.ezmember.co.kr/cache/bbs/2016/08/25/e1ecc151809f90a265886b51e9a44bd9.jpg")
                .price(900)
                .changeRate((float) 5)
                .changePrice(3)
                .build();
    }
}
