import { useNavigate } from 'react-router-dom';
import { IngredientInfo } from './IngredientCardAPI';

interface IngredientCardProps {
  ingredient: IngredientInfo;
  width?: number;
  height?: number;
}

const IngredientCard = ({
  ingredient,
  width = 150,
  height = 200,
}: IngredientCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ingredients/${ingredient.ingredientId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`식재료 "${ingredient.name}"를 장바구니에 추가했습니다.`);
  };

  const formatChange = (value: number) => {
    const absValue = Math.abs(value).toFixed(1);
    return `${absValue}%`;
  };

  const formatPrice = (price: string | number) => {
    return `${Number(price).toLocaleString()}원`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleCardClick}
    >
      <img
        src={ingredient.image || 'default-image-url.jpg'}
        alt={ingredient.name}
        className="w-full h-2/5 object-cover"
      />
      <div className="p-2 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold mb-1 truncate">{`${ingredient.name} (${ingredient.retailUnitsize}${ingredient.retailUnit})`}</h3>
          {ingredient.price ? (
            <>
              <p className="text-lg font-bold mb-1">
                {formatPrice(ingredient.price)}
              </p>
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
