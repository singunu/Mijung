package com.example.mijung.recipe.entity;

import lombok.Getter;

@Getter
public enum Kind {
    SIDE_DISH("밑반찬"),
    MAIN_DISH("메인반찬"),
    SOUP_STEW("국/탕"),
    STEW("찌개"),
    DESSERT("디저트"),
    NOODLES_DUMPLINGS("면/만두"),
    RICE_PORRIDGE_RICE_CAKE("밥/죽/떡"),
    FUSION("퓨전"),
    KIMCHI_PICKLES_SAUCES("김치/젓갈/장류"),
    SEASONING_SAUCE_JAM("양념/소스/잼"),
    WESTERN("양식"),
    SALAD("샐러드"),
    SOUP("스프"),
    BREAD("빵"),
    SNACK("과자"),
    TEA_BEVERAGE_ALCOHOL("차/음료/술"),
    OTHER("기타");

    private final String displayName;

    Kind(String displayName) {
        this.displayName = displayName;
    }
}
