import { queryClient } from '@/shared/query/query-client';
import { useRecipeList } from '../api/useRecipeList';
import { useEffect, useState } from 'react';
import { Error } from '@/shared/components';
import { recipeApi } from '@/entities/recipe/model/recipeApi';

interface Props {
  keyword: string;
}

export const RecipeList = ({ keyword }: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isFetching, error } = useRecipeList({ page, keyword });

  // keyword 변경 시 페이지 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    if (data?.pagination) {
      const lastPage = Math.ceil(
        data.pagination.total / data.pagination.perPage
      );
      const nextPage = (page % lastPage) + 1;

      queryClient.prefetchQuery({
        queryKey: ['recipe-list', nextPage, data.pagination.perPage, keyword],
        queryFn: () =>
          recipeApi.getRecipes(nextPage, data.pagination.perPage, keyword),
      });
    }
  }, [data, page, keyword]);

  if (error) return <Error />;
  if (!data) {
    return <div>Loading...</div>;
  }

  const { recipes, pagination } = data;

  const handleNextPage = () => {
    const lastPage = Math.ceil(pagination.total / pagination.perPage);
    setPage((prePage) => (prePage % lastPage) + 1);
  };

  return (
    <>
      {recipes.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.recipeId}>
              {recipe.name} - {recipe.kind}
            </li>
          ))}
        </ul>
      )}
      <div>
        <span>
          총 {pagination.total} 중 {pagination.page} 페이지
        </span>
      </div>
      {isFetching ? <span>Loading...</span> : null}
      <button onClick={handleNextPage}>Next Page</button>
    </>
  );
};
