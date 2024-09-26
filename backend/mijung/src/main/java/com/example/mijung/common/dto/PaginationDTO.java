package com.example.mijung.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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

    @Schema(description = "전체 개수", example = "20")
    private int total;

    @Schema(description = "페이지 번호", example = "1")
    private int page;

    @Schema(description = "페이지당 항목 수", example = "10")
    private int perPage;

    public static PaginationDTO of(int total, int page, int perPage) {
        return PaginationDTO.builder()
                .total(total)
                .page(page)
                .perPage(perPage)
                .build();
    }
}
