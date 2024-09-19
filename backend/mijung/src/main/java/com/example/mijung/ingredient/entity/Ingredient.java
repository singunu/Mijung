package com.example.mijung.ingredient.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredient {
    @Id
    @Column(name = "ingredient_id", updatable = false, nullable = false)
    private String id;

    @Column(name = "item_category_code", nullable = false, length = 20)
    private String itemCategoryCode;

    @Column(name = "item_category_name", nullable = false, length = 20)
    private String itemCategoryName;

    @Column(name = "item_code", nullable = false, length = 10)
    private String itemCode;

    @Column(name = "item_name", nullable = false, length = 20)
    private String itemName;

    @Column(name = "kind_code", nullable = false, length = 10)
    private String kindCode;

    @Column(name = "kind_name", nullable = false, length = 20)
    private String kindName;

    @Column(name = "retail_unit", nullable = false, length = 10)
    private String retailUnit;

    @Column(name = "retail_unitsize", nullable = false, length = 10)
    private String retailUnitsize;

    @Column
    private String image;

    @Column(name = "analyzed", nullable = false)
    private Boolean analyzed;
}