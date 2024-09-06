package com.example.mijung.recipe.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/recipe")
@RequiredArgsConstructor
public class RecipeController {

    @GetMapping
    @Operation(summary = "test용", description = "test용으로 만들었습니다.")
    @ApiResponse(responseCode = "200", description = "성공")
    public ResponseEntity<String> test() {

        return ResponseEntity.status(HttpStatus.OK).body("test입니다.");
    }

}
