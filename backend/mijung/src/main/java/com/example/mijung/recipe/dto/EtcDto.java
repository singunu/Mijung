package com.example.mijung.recipe.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EtcDto {
    private final Integer etcId;
    private final String name;
    private final String capacity;
    private final String type;


    public static EtcDto of(Integer etcId) {
        return EtcDto.builder()
                .etcId(etcId)
                .name("냄비")
                .capacity("")
                .type("조리도구")
                .build();
    }
}
