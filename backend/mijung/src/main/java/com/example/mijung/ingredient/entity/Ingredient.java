package com.example.mijung.ingredient.entity;

import com.example.mijung.material.entity.Material;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredient {
    @Id
    @Column(name = "ingredient_id", updatable = false, nullable = false)
    private Integer id;

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

    @Column(name = "is_priced", nullable = false)
    private Boolean isPriced;

    @OneToMany(mappedBy = "ingredient")
    private List<Material> material;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientInfo> ingredientInfos = new ArrayList<>();

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientRate> ingredientRates = new ArrayList<>();

    public IngredientInfo getLatestIngredientInfo() {
        return ingredientInfos.stream()
                .max((info1, info2) -> info1.getDate().compareTo(info2.getDate()))
                .orElse(null);
    }

    public IngredientRate getLatestIngredientRate() {
        return ingredientRates.stream()
                .max((rate1, rate2) -> rate1.getDate().compareTo(rate2.getDate()))
                .orElse(null);
    }
}