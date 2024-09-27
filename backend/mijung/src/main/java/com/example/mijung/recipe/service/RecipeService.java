package com.example.mijung.recipe.service;

import com.example.mijung.common.dto.PaginationAndSearchDto;
import com.example.mijung.common.dto.PaginationDTO;
import com.example.mijung.common.dto.RecipeListResponse;
import com.example.mijung.common.dto.ResponseDTO;
import com.example.mijung.recipe.dto.EtcDto;
import com.example.mijung.recipe.dto.MaterialDto;
import com.example.mijung.recipe.dto.RecipeSearchResponse;
import com.example.mijung.recipe.dto.RecipeViewResponse;
import com.example.mijung.recipe.dto.StepDto;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    @Transactional
    public ResponseDTO<List<RecipeListResponse>> getRecipeList(PaginationAndSearchDto dto) {

        List<RecipeListResponse> data = new ArrayList<>();
        for (int i = 1; i < dto.getPerPage() + 1; i++) {
            data.add(RecipeListResponse.test(i));
        }

        PaginationDTO pagination = PaginationDTO.of(20, dto.getPage(), dto.getPerPage());

        return ResponseDTO.of(data, pagination);
    }

    @Transactional
    public List<RecipeSearchResponse> getRecipeSearch(String search) {

        List<RecipeSearchResponse> data = new ArrayList<>();
        for (int i = 1; i < 6; i++) {
            data.add(RecipeSearchResponse.of(i, search));
        }

        return data;
    }

    @Transactional
    public RecipeViewResponse getRecipe(Integer recipeId) {

        List<MaterialDto> matetials = new ArrayList<>();
        for (int i = 1; i < 4; i++) {
            matetials.add(MaterialDto.of(i, i));
        }

        List<EtcDto> etc = new ArrayList<>();
        for (int i = 1; i < 4; i++) {
            etc.add(EtcDto.of(i));
        }

        List<StepDto> steps = new ArrayList<>();
        for (int i = 1; i < 4; i++) {
            steps.add(StepDto.of(i));
        }

        return RecipeViewResponse.of(recipeId, matetials, etc, steps);
    }

}
