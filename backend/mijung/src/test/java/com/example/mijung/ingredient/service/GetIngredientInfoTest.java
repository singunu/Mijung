package com.example.mijung.ingredient.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

import com.example.mijung.ingredient.dto.IngredientInfoViewResponse;
import com.example.mijung.ingredient.entity.Ingredient;
import com.example.mijung.ingredient.entity.IngredientInfo;
import com.example.mijung.ingredient.entity.IngredientRate;
import com.example.mijung.ingredient.repository.IngredientRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
public class GetIngredientInfoTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @Test
    @DisplayName("색재료 정보 조회 테스트 - 성공 : 가격 정보가 있는 경우")
    public void getIngredientInfo_IsPricedTrue() {
        // Given
        Integer ingredientId = 1;  // 테스트할 식재료 ID
        Ingredient ingredient = Ingredient.builder()
                .id(ingredientId)
                .itemCategoryCode("100")
                .itemCategoryName("식료품")
                .itemCode("111")
                .itemName("쌀")
                .kindCode("01")
                .kindName("백미")
                .retailUnit("kg")
                .retailUnitsize("20")
                .isPriced(true)
                .build();

        IngredientInfo ingredientInfo = IngredientInfo.builder()
                .id(1)
                .date(LocalDate.now())
                .price(1000)
                .ingredient(ingredient)
                .build();

        IngredientRate ingredientRate = IngredientRate.builder()
                .id(1)
                .date(LocalDate.now())
                .weekIncreaseRate((float) 0.5)
                .weekIncreasePrice(100)
                .ingredient(ingredient)
                .build();

        ReflectionTestUtils.setField(ingredient, "ingredientInfos", List.of(ingredientInfo));
        ReflectionTestUtils.setField(ingredient, "ingredientRates", List.of(ingredientRate));

        given(ingredientRepository.findById(ingredientId)).willReturn(Optional.of(ingredient));

        // When
        IngredientInfoViewResponse ingredientDetail = ingredientService.getIngredientInfo(ingredientId);

        // Then
        assertNotNull(ingredientDetail);
        assertEquals("쌀", ingredientDetail.getName());
        assertEquals("20", ingredientDetail.getRetailUnitsize());
        assertEquals("kg", ingredientDetail.getRetailUnit());
        assertNotNull(ingredientDetail.getPrice());
        assertNotNull(ingredientDetail.getChangeRate());
        assertNotNull(ingredientDetail.getChangePrice());
    }

    @Test
    @DisplayName("색재료 정보 조회 테스트 - 성공 : 가격 정보가 없는 경우")
    public void getIngredientInfo_IsPricedFalse() {
        // Given
        Integer ingredientId = 2;  // 테스트할 식재료 ID
        Ingredient ingredient = Ingredient.builder()
                .id(ingredientId)
                .itemName("쌀")
                .isPriced(false)
                .build();

        when(ingredientRepository.findById(ingredientId)).thenReturn(Optional.of(ingredient));

        // When
        IngredientInfoViewResponse response = ingredientService.getIngredientInfo(ingredientId);

        // Then
        assertNotNull(response);
        assertEquals(ingredientId, response.getIngredientId());
        assertEquals("쌀", response.getName());
        assertNull(response.getRetailUnitsize());
        assertNull(response.getRetailUnit());
        assertNull(response.getPrice());
        assertNull(response.getChangeRate());
        assertNull(response.getChangePrice());
    }

    @Test
    @DisplayName("색재료 정보 조회 테스트 - 실패 : 식재료가 없는 경우")
    void getIngredientInfo_NotFound_Fail() {
        // Given
        Integer nonExistentId = 9999;
        when(ingredientRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResponseStatusException.class, () -> ingredientService.getIngredientInfo(nonExistentId));
    }
}
