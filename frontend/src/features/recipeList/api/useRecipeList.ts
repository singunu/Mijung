import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '@/entities/recipe/model/recipeApi';

export const useRecipeList = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['recipe-list', page, perPage],
    queryFn: () => recipeApi.getRecipes(page, perPage),
  });
};
