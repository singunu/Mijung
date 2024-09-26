package com.example.mijung.common.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 모든 응답에 대한 공통적인 부분을 정의하는 클래스
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Schema(description = "공통 응답")
public class ResponseDTO<T> {

    @Schema(description = "응답 데이터")
    private T data;

    @Schema(description = "페이지네이션 정보")
    private PaginationDTO pagination;

    public static <T> ResponseDTO<T> from(T data) {
        return ResponseDTO.<T>builder()
                .data(data)
                .pagination(null)
                .build();
    }

    public static <T> ResponseDTO<T> of(T data, PaginationDTO pagination) {
        return ResponseDTO.<T>builder()
                .data(data)
                .pagination(pagination)
                .build();
    }
}
