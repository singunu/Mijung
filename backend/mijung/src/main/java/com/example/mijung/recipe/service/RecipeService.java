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
import com.example.mijung.recipe.entity.Recipe;
import com.example.mijung.recipe.repository.RecipeRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Transactional
    public ResponseDTO<List<RecipeListResponse>> getRecipeList(PaginationAndSearchDto dto) {
        Pageable pageable = PageRequest.of(dto.getPage() - 1, dto.getPerPage());

        Page<Recipe> recipesPage = recipeRepository.findByNameContaining(resolveKeyword(dto.getKeyword()), pageable);


        List<RecipeListResponse> data = recipesPage.getContent().stream()
                .map(RecipeListResponse::of)
                .collect(Collectors.toList());


        PaginationDTO pagination = PaginationDTO.of(
                (int) recipesPage.getTotalElements(),
                dto.getPage(),
                dto.getPerPage()
        );

        return ResponseDTO.of(data, pagination);
    }

    @Transactional
    public List<RecipeSearchResponse> getRecipeSearch(String search) {

        Pageable pageable = PageRequest.of(0, 5);

        Page<Recipe> recipesPage = recipeRepository.findByNameContaining(search, pageable);

        return recipesPage.getContent().stream()
                .map(recipe -> RecipeSearchResponse.of(recipe.getId(), recipe.getName()))
                .collect(Collectors.toList());
    }

    @Transactional
    public RecipeViewResponse getRecipe(Integer recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 레시피가 존재하지 않습니다."));


        List<MaterialDto> materials = recipe.getMaterials().stream()
                .map(MaterialDto::of)
                .collect(Collectors.toList());


        List<EtcDto> etcs = recipe.getEtcs().stream()
                .map(EtcDto::of)
                .collect(Collectors.toList());


        List<StepDto> steps = recipe.getSteps().stream()
                .map(StepDto::of)
                .collect(Collectors.toList());

        return RecipeViewResponse.of(recipe, materials, etcs, steps);

    }


    private String resolveKeyword(String keyword) {
        // 키워드가 null이면 빈 문자열로 처리하여 모든 레시피 조회
        return keyword == null ? "" : keyword;
    }
}
