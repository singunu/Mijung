package com.example.mijung.recipe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recipe {
    @Id
    @Column(name = "recipe_id", updatable = false, nullable = false)
    private Integer id;

    @Column(columnDefinition = "TEXT")
    private String name;

    @Column
    private Integer hit;

    @Column(name = "scrap_count")
    private Integer scrapCount;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Kind kind;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Inbun inbun;

    @Enumerated(value = EnumType.STRING)
    @Column
    private Level level;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "cooking_time")
    private CookingTime cookingTime;

    @Column
    private String image;
}
