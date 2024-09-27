import { useNavigate } from 'react-router-dom';
import { Ingredient } from '../../shared/api/ingredientTypes';

interface IngredientCardProps {
  ingredient: Ingredient;
  onAddToCart?: (id: number) => void;
}

const IngredientCard = ({
  ingredient,
  onAddToCart,
}: IngredientCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ingredients/${ingredient.ingredientId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(ingredient.ingredientId);
  };

  const formatChange = (value: number | undefined) => {
    if (value === undefined) return '가격 등락 정보 없음';
    const absValue = Math.abs(value).toFixed(1);
    return `${absValue}%`;
  };

  const formatPrice = (price: string | number | undefined) => {
    if (price === undefined) return '가격 정보 없음';
    return `${Number(price).toLocaleString()}원`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col"
      onClick={handleCardClick}
    >
      {ingredient?.image && (
        <img
          src={ingredient.image}
          alt={ingredient.name ?? '재료 이미지'}
          className="w-full h-2/5 object-cover"
        />
      )}
      <div className="p-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold mb-1 truncate">
            {ingredient?.name ?? '알 수 없는 재료'}{' '}
            {ingredient?.retailUnit &&
              ingredient?.retailUnitsize &&
              `(${ingredient.retailUnitsize}${ingredient.retailUnit})`}
          </h3>
          {ingredient?.price ? (
            <>
              <p className="text-lg font-bold mb-1">
                {formatPrice(ingredient.price)}
              </p>
              {ingredient?.changeRate !== undefined &&
                ingredient?.changePrice !== undefined && (
                  <div
                    className={`text-xs flex items-center ${ingredient.changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
                  >
                    <span className="mr-1">
                      {ingredient.changeRate >= 0 ? '▲' : '▼'}
                    </span>
                    <span>{formatChange(ingredient.changeRate)}</span>
                    <span className="ml-1">
                      ({formatPrice(Math.abs(ingredient.changePrice))})
                    </span>
                  </div>
                )}
            </>
          ) : (
            <p className="text-gray-500 text-xs">가격정보 없음</p>
          )}
        </div>
        <button
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 w-full"
          onClick={handleAddToCart}
        >
          식탁에 추가
        </button>
      </div>
    </div>
  );
};

export default IngredientCard;
