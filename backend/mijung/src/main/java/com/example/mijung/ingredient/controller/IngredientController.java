package com.example.mijung.ingredient.controller;

import com.example.mijung.common.dto.PaginationAndFilteringDto;
import com.example.mijung.common.dto.RecipeListResponse;
import com.example.mijung.common.dto.ResponseDTO;
import com.example.mijung.ingredient.dto.IngredientInfoViewResponse;
import com.example.mijung.ingredient.dto.IngredientPriceGraphViewResponse;
import com.example.mijung.ingredient.dto.IngredientSearchResponse;
import com.example.mijung.ingredient.dto.IngredientSiseRequest;
import com.example.mijung.ingredient.service.IngredientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ingredients")
public class IngredientController {
    private final IngredientService ingredientService;

    /**
     * 식재료 목록 조회
     *
     * @param dto category, page, perPage, keyword
     * @return 페이지 번호에 맞는 식재료 수 만큼 식재료 목록을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 목록 조회에 실패하면 에러 코드를 담은 * ResponseEntity를
     * 반환합니다.
     */
    @GetMapping("/search")
    @Operation(summary = "식재료 목록 조회", description = "페이지 번호에 맞는 식재료 수 만큼 식재료 목록을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 목록 조회에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientList(@Valid @ModelAttribute PaginationAndFilteringDto dto) {

        ResponseDTO<List<IngredientInfoViewResponse>> result = ingredientService.getIngredientList(dto);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /**
     * 식재료 시세 조회
     *
     * @param request period, change, count
     * @return 기간과 등락에 맞는  count 수 만큼 식재료 목록을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 시세 조회에 실패하면 에러 코드를 담은 * ResponseEntity를
     * 반환합니다.
     */
    @GetMapping("/price")
    @Operation(summary = "식재료 시세 조회", description = "기간과 등락에 맞는  count 수 만큼 식재료 목록을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 시세 조회에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientSiseList(@Valid @ModelAttribute IngredientSiseRequest request) {

        ResponseDTO<List<IngredientInfoViewResponse>> result = ingredientService.getIngredientSiseList(request);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    /**
     * 식재료 검색 자동완성 조회
     *
     * @param search 검색어
     * @return 검색어를 포함하는 5개의 식재료 Id, 이름을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 검색 자동완성 조회에 실패하면 에러 코드를 담은 * ResponseEntity를
     * 반환합니다.
     */
    @GetMapping("/search/{search}")
    @Operation(summary = "식재료 검색 자동완성 조회", description = "검색어를 포함하는 5개의 식재료 Id, 이름을 포함하는 ResponseEntity 객체를 반환합니다. 식재료 검색 자동완성 조회에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientSearch(@PathVariable("search") String search) {

        List<IngredientSearchResponse> result = ingredientService.getIngredientSearch(search);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.from(result));
    }

    /**
     * 식재료 상제보기 - 정보
     *
     * @param ingredientId 식재료 ID
     * @return 식재료 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(정보)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.
     */
    @GetMapping("/{ingredientId}/info")
    @Operation(summary = "식재료 상세보기 - 정보", description = "식재료 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(정보)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientInfo(@PathVariable("ingredientId") Integer ingredientId) {

        IngredientInfoViewResponse result = ingredientService.getIngredientInfo(ingredientId);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.from(result));
    }

    /**
     * 식재료 상세보기 - 시세 그래프
     *
     * @param ingredientId 식재료 ID
     * @return 식재료 시세 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(시세 그래프)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.
     */
    @GetMapping("/{ingredientId}/price-graph")
    @Operation(summary = "식재료 상세보기 - 시세 그래프", description = "식재료 시세 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(시세 그래프)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientPriceGraph(@PathVariable("ingredientId") Integer ingredientId) {

        List<IngredientPriceGraphViewResponse> result = ingredientService.getIngredientPriceGraph(ingredientId);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.from(result));
    }

    /**
     * 식재료 상세보기 - 추천 레시피
     *
     * @param ingredientId 식재료 ID
     * @return 레시피 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(추천 레시피)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.
     */
    @GetMapping("/{ingredientId}/recommend-recipes")
    @Operation(summary = "식재료 상세보기 - 추천 레시피", description = "레시피 정보를 포함하는 ResponseEntity 객체를 반환합니다. 식재료 상세보기(추천 레시피)에 실패하면 에러 코드를 담은 ResponseEntity를 반환합니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<ResponseDTO<?>> getIngredientRecommendRecipe(
            @PathVariable("ingredientId") Integer ingredientId) {

        List<RecipeListResponse> result = ingredientService.getIngredientRecommendRecipe(ingredientId);

        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.from(result));
    }

}
