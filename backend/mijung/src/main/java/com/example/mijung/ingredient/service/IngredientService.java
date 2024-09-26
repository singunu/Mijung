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
import com.example.mijung.ingredient.repository.IngredientInfoRepository;
import com.example.mijung.ingredient.repository.IngredientRateRepository;
import com.example.mijung.ingredient.repository.IngredientRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    @Transactional
    public ResponseDTO<List<IngredientInfoViewResponse>> getIngredientList(PaginationAndFilteringDto dto) {

        List<IngredientInfoViewResponse> data = new ArrayList<>();
        for (int i = 1; i < dto.getPerPage() + 1; i++) {
            data.add(IngredientInfoViewResponse.test(i, dto.getCategory()));
        }

        PaginationDTO pagination = PaginationDTO.of(20, dto.getPage(), dto.getPerPage());

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


    public Ingredient getIngredient(Integer ingredientId) {
        return ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, INGREDIENT_NOT_FOUND.getMessage()));
    }
}
