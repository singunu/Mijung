import { PaginationInfo } from '@/shared/api/recipeTypes';
import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '@/entities/recipe/model/recipeApi';
import { Recipe } from '@/shared/api/recipeTypes';
import { isArray } from 'underscore';
import { queryClient } from '@/shared/query/query-client';

interface Props {
  page?: number;
  perPage?: number;
  keyword: string;
}

interface RecipeList {
  recipes: Recipe[];
  pagination: PaginationInfo;
}

export const useRecipeList = ({ page = 1, perPage = 10, keyword }: Props) => {
  const isValid = (data: RecipeList, keyword: string) => {
    if (isArray(data.recipes) && data.recipes.length > 0) return data;
    else {
      queryClient.removeQueries({
        queryKey: ['recipe-list', page, perPage, keyword],
      });
      return undefined;
    }
  };
  return useQuery({
    queryKey: ['recipe-list', page, perPage, keyword],
    queryFn: () => recipeApi.getRecipes(page, perPage, keyword),
    select: (data) => isValid(data, keyword),
  });
};
