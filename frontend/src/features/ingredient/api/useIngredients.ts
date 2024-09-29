// 데이터 fetching을 위한 React Query 훅
import { useQuery } from '@tanstack/react-query';
import { ingredientApi } from '../../../entities/ingredient/model/ingredientApi';
import { IngredientSiseRequest } from '../../../shared/api/ingredientTypes';

export const useIngredients = (
  page: number = 1,
  perPage: number = 10,
  category: string = 'all'
) => {
  return useQuery({
    queryKey: ['ingredient', page, perPage, category],
    queryFn: () => ingredientApi.getIngredients(page, perPage, category),
  });
};

// 메인페이지 재료 가격 추이 데이터 가져오는 메서드
export const useIngredientSise = (params: IngredientSiseRequest) => {
  return useQuery({
    queryKey: ['ingredientSise', params],
    queryFn: () => ingredientApi.getIngredientSise(params),
  });
};

export const useIngredientInfo = (ingredientId: number) => {
  return useQuery({
    queryKey: ['ingredientInfo', ingredientId],
    queryFn: () => ingredientApi.getIngredientInfo(ingredientId),
  });
};
