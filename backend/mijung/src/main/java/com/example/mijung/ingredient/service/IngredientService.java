package com.example.mijung.ingredient.service;

import static com.example.mijung.ingredient.enums.IngredientMassage.INGREDIENT_NOT_FOUND;

import com.example.mijung.common.dto.PaginationAndFilteringDto;
import com.example.mijung.common.dto.PaginationDTO;
import com.example.mijung.common.dto.RecipeListResponse;
import com.example.mijung.common.dto.ResponseDTO;
import com.example.mijung.ingredient.dto.IngredientInfoViewResponse;
import com.example.mijung.ingredient.dto.IngredientPriceGraphViewResponse;
import com.example.mijung.ingredient.dto.IngredientSearchResponse;
import com.example.mijung.ingredient.dto.IngredientSiseRequest;
import com.example.mijung.ingredient.entity.Ingredient;
import com.example.mijung.ingredient.entity.IngredientInfo;
import com.example.mijung.ingredient.entity.IngredientRate;
import com.example.mijung.ingredient.repository.IngredientRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    @Transactional
    public ResponseDTO<List<IngredientInfoViewResponse>> getIngredientList(PaginationAndFilteringDto dto) {

        Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getPerPage());

        // DB에서 카테고리와 키워드에 맞는 식재료 데이터를 페이징하여 조회
        Page<Ingredient> ingredientsPage = ingredientRepository.findByItemCategoryNameContainingAndItemNameContaining(
                resolveCategory(dto.getCategory()),
                resolveKeyword(dto.getKeyword()),
                pageable
        );

        // 조회된 데이터를 DTO로 변환
        List<IngredientInfoViewResponse> data = ingredientsPage.getContent().stream()
                .map(IngredientInfoViewResponse::of)  // Ingredient -> DTO 변환
                .collect(Collectors.toList());

        // 페이지네이션 정보 생성
        PaginationDTO pagination = PaginationDTO.of(
                (int) ingredientsPage.getTotalElements(), dto.getPage(), dto.getPerPage()
        );

        // 데이터와 페이지네이션 정보를 담아 반환
        return ResponseDTO.of(data, pagination);
    }

    @Transactional
    public ResponseDTO<List<IngredientInfoViewResponse>> getIngredientSiseList(IngredientSiseRequest request) {

        List<IngredientInfoViewResponse> data = new ArrayList<>();
        for (int i = 1; i < request.getCount() + 1; i++) {
            data.add(IngredientInfoViewResponse.test(i, ""));
        }

        return ResponseDTO.from(data);
    }

    @Transactional
    public List<IngredientSearchResponse> getIngredientSearch(String search) {

        List<IngredientSearchResponse> data = new ArrayList<>();
        for (int i = 1; i < 6; i++) {
            data.add(IngredientSearchResponse.of(i, search));
        }

        return data;
    }

    @Transactional
    public IngredientInfoViewResponse getIngredientInfo(Integer ingredientId) {

        Ingredient ingredient = getIngredient(ingredientId);

        if(!ingredient.getIsPriced()){
            return IngredientInfoViewResponse.of(ingredient);
        }

        IngredientInfo ingredientInfo = ingredient.getLatestIngredientInfo();
        IngredientRate ingredientRate = ingredient.getLatestIngredientRate();

        return IngredientInfoViewResponse.of(ingredient, ingredientInfo.getPrice(), ingredientRate.getWeekIncreaseRate(), ingredientRate.getWeekIncreasePrice());
    }

    @Transactional
    public List<IngredientPriceGraphViewResponse> getIngredientPriceGraph(Integer ingredientId) {

        List<IngredientPriceGraphViewResponse> data = new ArrayList<>();

        Random random = new Random();
        LocalDate now = LocalDate.now();
        for (LocalDate date = now.minusYears(1); date.isBefore(now.plusDays(1)); date = date.plusDays(1)) {
            data.add(IngredientPriceGraphViewResponse.of(date, Math.abs(random.nextInt()), Math.abs(random.nextInt())));
        }

        for (LocalDate date = now.plusDays(1); date.isBefore(now.plusDays(4)); date = date.plusDays(1)) {
            data.add(IngredientPriceGraphViewResponse.of(date, 0, Math.abs(random.nextInt())));
        }

        return data;
    }

    @Transactional
    public List<RecipeListResponse> getIngredientRecommendRecipe(Integer ingredientId) {

        List<RecipeListResponse> data = new ArrayList<>();
        for (int i = 1; i < 3; i++) {
            data.add(RecipeListResponse.of(i));
        }

        return data;
    }

    public List<IngredientInfoViewResponse> getIngredientPrice(IngredientSiseRequest ingredientSiseRequest) {
        if(!isValidIngredientRequest(ingredientSiseRequest)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, INGREDIENT_NOT_FOUND.getMessage());
        }

        String period = ingredientSiseRequest.getPeriod();
        String change = ingredientSiseRequest.getChange();


        return null;
    }


    public Ingredient getIngredient(Integer ingredientId) {
        return ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, INGREDIENT_NOT_FOUND.getMessage()));
    }

    private String resolveCategory(String category) {
        // 카테고리가 "all"이면 빈 문자열로 처리하여 모든 카테고리 조회
        return category.equals("all") ? "" : category;
    }

    private String resolveKeyword(String keyword) {
        // 키워드가 null이면 빈 문자열로 처리하여 모든 이름 조회
        return keyword == null ? "" : keyword;
    }

    public boolean isValidIngredientRequest(IngredientSiseRequest ingredientSiseRequest) {
        if(ingredientSiseRequest == null){
            return false;
        }
        if (ingredientSiseRequest.getPeriod() == null || ingredientSiseRequest.getChange() == null) {
            return false;
        }
        // Period 및 Change의 유효성 검사
        boolean isValidPeriod = Set.of("year", "week", "month").contains(ingredientSiseRequest.getPeriod());
        boolean isValidChange = Set.of("positive", "negative").contains(ingredientSiseRequest.getChange());

        return isValidPeriod && isValidChange;
    }
}
