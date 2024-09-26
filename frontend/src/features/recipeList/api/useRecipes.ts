import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../../../entities/recipe/model/recipeApi';

export const useRecipes = (page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['recipe', page, perPage],
    queryFn: () => recipeApi.getRecipes(page, perPage),
  });
};
