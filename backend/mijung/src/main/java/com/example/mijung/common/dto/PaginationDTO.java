package com.example.mijung.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

// pagination에 대한 정보를 담는 DTO
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@ToString
public class PaginationDTO {
    private int total;
    private int page;
    private int perPage;

    public static PaginationDTO of(int total, int page, int perPage) {
        return PaginationDTO.builder()
                .total(total)
                .page(page)
                .perPage(perPage)
                .build();
    }
}
