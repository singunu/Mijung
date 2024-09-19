package com.example.mijung.recipe.entity;

import lombok.Getter;

@Getter
public enum CookingTime {
    WITHIN_5_MINUTES("5분이내"),
    WITHIN_10_MINUTES("10분이내"),
    WITHIN_15_MINUTES("15분이내"),
    WITHIN_20_MINUTES("20분이내"),
    WITHIN_30_MINUTES("30분이내"),
    WITHIN_60_MINUTES("60분이내"),
    WITHIN_90_MINUTES("90분이내"),
    WITHIN_2_HOURS("2시간이내"),
    MORE_THAN_2_HOURS("2시간이상");

    private final String displayName;

    CookingTime(String displayName) {
        this.displayName = displayName;
    }
}
