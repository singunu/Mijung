import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '@/entities/recipe/model/recipeApi';

export const useRecipeDetail = (recipeId: number) => {
  return useQuery({
    queryKey: ['recipe-detail', recipeId],
    queryFn: () => recipeApi.getRecipeDetail(recipeId),
  });
};
