package com.example.mijung.ingredient.dto;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IngredientPriceGraphViewResponse {
    private final LocalDate date;
    private final Integer price;
    private final Integer expectedPrice;

    public static IngredientPriceGraphViewResponse of(LocalDate date, Integer price, Integer expectedPrice) {
        return IngredientPriceGraphViewResponse.builder()
                .date(date)
                .price(price)
                .expectedPrice(expectedPrice)
                .build();
    }
}
