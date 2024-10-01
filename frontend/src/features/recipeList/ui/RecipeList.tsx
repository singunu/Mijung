import { queryClient } from '@/shared/query/query-client';
import { useRecipeList } from '../api/useRecipeList';
import { useEffect, useState } from 'react';
import { Error } from '@/shared/components';
import { recipeApi } from '@/entities/recipe/model/recipeApi';

interface Props {
  keyword: string;
}

export const RecipeList = ({ keyword }: Props) => {
  const [page, setPage] = useState<number>(0);
  const { data, isFetching, error } = useRecipeList({ page, keyword });

  useEffect(() => {
    if (data?.pagination) {
      const nextPage = (page + 1) % data.pagination.perPage;
      queryClient.prefetchQuery({
        queryKey: ['recipe-list', nextPage, data.pagination.perPage, keyword],
        queryFn: () =>
          recipeApi.getRecipes(nextPage, data.pagination.perPage, keyword),
      });
    }
  }, [data, page, keyword]);

  if (!data) {
    console.log('No data on RecipeList');
    return <Error />;
  }

  if (error) return <Error />;

  const { recipes, pagination } = data;

  return (
    <>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipeId}>
            {recipe.name} - {recipe.kind}
          </li>
        ))}
      </ul>
      <div>
        <span>
          총 {pagination.total} 중 {pagination.page} 페이지
        </span>
      </div>
      {isFetching ? <span>Loading...</span> : null}
      <button
        onClick={() => {
          setPage((prevPage) => (prevPage + 1) % pagination.perPage);
        }}
      >
        Next Page
      </button>
    </>
  );
};
