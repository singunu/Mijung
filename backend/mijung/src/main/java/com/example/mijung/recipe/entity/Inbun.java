package com.example.mijung.recipe.entity;

import lombok.Getter;

@Getter
public enum Inbun {
    ONE("1인분"),
    TWO("2인분"),
    THREE("3인분"),
    FOUR("4인분"),
    FIVE("5인분"),

    SIX_OR_MORE("6인분 이상");

    private final String displayName;

    Inbun(String displayName) {
        this.displayName = displayName;
    }
}
