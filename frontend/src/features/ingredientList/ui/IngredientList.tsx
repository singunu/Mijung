import { Error } from '../../../shared/components';
import { useIngredients } from '../api/useIngredients';
import IngredientCard from '../../../widgets/IngredientCard/IngredientCard';

export const IngredientList = () => {
  const { data, isLoading, error } = useIngredients();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <Error />;

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.ingredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>
            <IngredientCard ingredient={ingredient} />
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
