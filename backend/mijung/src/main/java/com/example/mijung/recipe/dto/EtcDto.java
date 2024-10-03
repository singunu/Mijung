package com.example.mijung.recipe.dto;

import com.example.mijung.recipe.entity.Etc;
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

    public static EtcDto of(Etc etc) {
        return EtcDto.builder()
                .etcId(etc.getId())
                .name(etc.getName())
                .capacity(etc.getCapacity())
                .type(etc.getType())
                .build();
    }
}
