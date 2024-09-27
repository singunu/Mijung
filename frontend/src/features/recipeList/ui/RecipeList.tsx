import { Error } from '@/shared/components';
import { useRecipeList } from '../api/useRecipeList';

export const RecipeList = () => {
  const { data, isLoading, error } = useRecipeList();

  if (isLoading) return <div>Loding...</div>;
  if (error)
    return (
      <>
        <Error />
      </>
    );

  return (
    <>
      <ul>
        {data?.recipes.map((recipe) => (
          <li key={recipe.recipeId}>
            {recipe.name} - {recipe.kind}
          </li>
        ))}
      </ul>
      <div>
        <span>
          총 {data?.pagination.total} 중 {data?.pagination.page} 페이지
        </span>
      </div>
    </>
  );
};
