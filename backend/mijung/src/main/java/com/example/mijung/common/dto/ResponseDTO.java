package com.example.mijung.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 모든 응답에 대한 공통적인 부분을 정의하는 클래스
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ResponseDTO<T>  {
    private T data;
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
