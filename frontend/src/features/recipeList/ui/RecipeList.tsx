import { Error } from '@/shared/components';
import { useRecipeList } from '../api/useRecipeList';

export const RecipeList = () => {
  const { data, isLoading, error } = useRecipeList();

  if (isLoading) return <div>Loding...</div>;
  if (error) return <Error />;
  if (!data) {
    throw new TypeError('Data is undefined in RecipeList');
  }

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
    </>
  );
};
