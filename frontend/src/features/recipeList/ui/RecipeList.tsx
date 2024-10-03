import { queryClient } from '@/shared/query/query-client';
import { useRecipeList } from '../api/useRecipeList';
import { useEffect, useState } from 'react';
import { Error } from '@/shared/components';
import { recipeApi } from '@/entities/recipe/model/recipeApi';
import { useNavigate } from 'react-router-dom';

interface Props {
  keyword: string;
}

export const RecipeList = ({ keyword }: Props) => {
  const [page, setPage] = useState<number>(1);
  const { data, isFetching, error } = useRecipeList({ page, keyword });
  const navigate = useNavigate();

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

  const handleNextPage = () => {
    if (data?.pagination) {
      const lastPage = Math.ceil(
        data.pagination.total / data.pagination.perPage
      );
      setPage((prePage) => (prePage % lastPage) + 1);
    }
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <>
      {data?.recipes.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <ul>
          {data?.recipes.map((recipe) => (
            <li
              key={recipe.recipeId}
              onClick={() => handleRecipeClick(recipe.recipeId)}
              className="cursor-pointer p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-100"
            >
              {recipe.name} - {recipe.kind}
            </li>
          ))}
        </ul>
      )}
      <div>
        <span>
          총 {data?.pagination.total} 중 {data?.pagination.page} 페이지
        </span>
      </div>
      {isFetching ? <span>Loading...</span> : null}
      <button onClick={handleNextPage}>Next Page</button>
    </>
  );
};
