import { useNavigate } from 'react-router-dom';

interface IngredientCardProps {
  ingredientId: number;
  name: string;
  unit?: string;
  unitSize?: string;
  image?: string;
  price?: string | number;
  changeRate?: number;
  changePrice?: number;
  width?: number;
  height?: number;
  onAddToCart?: (id: number) => void;
}

const IngredientCard = ({
  ingredientId,
  name,
  unit,
  unitSize,
  image,
  price,
  changeRate,
  changePrice,
  width = 150,
  height = 200,
}: IngredientCardProps) => {
  const navigate = useNavigate();

  // 카드 클릭 시 해당 식재료의 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/ingredients/${ingredientId}`);
  };

  // '식탁에 추가' 버튼 클릭 시 장바구니에 추가
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 방지
    console.log(`식재료 ID ${ingredientId}를 식탁에 추가했습니다.`);
    // 여기에 실제 장바구니 추가 로직을 구현할 수 있습니다.
  };

  // 변화율을 절대값으로 포맷팅
  const formatChange = (value: number) => {
    const absValue = Math.abs(value).toFixed(1);
    return `${absValue}%`;
  };

  // 가격을 원 단위로 포맷팅
  const formatPrice = (price: string | number) => {
    return `${Number(price).toLocaleString()}원`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col"
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={handleCardClick}
    >
      {/* 식재료 이미지 */}
      {image && (
        <img src={image} alt={name} className="w-full h-2/5 object-cover" />
      )}
      <div className="p-2 flex-grow flex flex-col justify-between">
        <div>
          {/* 식재료 이름과 단위 */}
          <h3 className="text-sm font-semibold mb-1 truncate">
            {name} {unit && unitSize && `(${unitSize}${unit})`}
          </h3>
          {price ? (
            <>
              {/* 가격 정보 */}
              {/* 가격 변동 정보 */}
              <p className="text-lg font-bold mb-1">{formatPrice(price)}</p>
              {changeRate !== undefined && changePrice !== undefined && (
                <div
                  className={`text-xs flex items-center ${changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}
                >
                  <span className="mr-1">{changeRate >= 0 ? '▲' : '▼'}</span>
                  <span>{formatChange(changeRate)}</span>
                  <span className="ml-1">
                    ({formatPrice(Math.abs(changePrice))})
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-xs">가격정보 없음</p>
          )}
        </div>
        {/* 식탁에 추가 버튼 */}
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
