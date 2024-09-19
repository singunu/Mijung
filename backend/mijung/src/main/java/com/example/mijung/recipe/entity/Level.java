package com.example.mijung.recipe.entity;

import lombok.Getter;

@Getter
public enum Level {
    ANYONE("아무나"),
    BEGINNER("초급"),
    INTERMEDIATE("중급"),
    ADVANCED("고급"),
    MASTER("신의경지");

    private final String displayName;

    Level(String displayName) {
        this.displayName = displayName;
    }
}
