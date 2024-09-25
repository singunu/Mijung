package com.example.mijung.ingredient.service;

import com.example.mijung.common.dto.PaginationAndFilteringDto;
import com.example.mijung.common.dto.PaginationDTO;
import com.example.mijung.common.dto.RecipeListResponse;
import com.example.mijung.common.dto.ResponseDTO;
import com.example.mijung.ingredient.dto.IngredientInfoViewResponse;
import com.example.mijung.ingredient.dto.IngredientPriceGraphViewResponse;
import com.example.mijung.ingredient.dto.IngredientSearchResponse;
import com.example.mijung.ingredient.dto.IngredientSiseRequest;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class IngredientService {

    @Transactional
    public ResponseDTO<List<IngredientInfoViewResponse>> getIngredientList(PaginationAndFilteringDto dto) {

        List<IngredientInfoViewResponse> data = new ArrayList<>();
        for (int i = 1; i < dto.getPerPage() + 1; i++) {
            data.add(IngredientInfoViewResponse.of(i));
        }

        PaginationDTO pagination = PaginationDTO.of(20, dto.getPage(), dto.getPerPage());

        return ResponseDTO.of(data, pagination);
    }

    @Transactional
    public ResponseDTO<List<IngredientInfoViewResponse>> getIngredientSiseList(IngredientSiseRequest request) {

        List<IngredientInfoViewResponse> data = new ArrayList<>();
        for (int i = 1; i < request.getCount() + 1; i++) {
            data.add(IngredientInfoViewResponse.of(i));
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

        return IngredientInfoViewResponse.of(ingredientId);
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
}
