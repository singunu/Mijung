import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import { getIngredientInfo, IngredientInfo } from './IngredientDetailAPI';

const IngredientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<IngredientInfo | null>(null);

  useEffect(() => {
    const fetchIngredientInfo = async () => {
      try {
        if (id) {
          const data = await getIngredientInfo(Number(id));
          setIngredient(data);
        }
      } catch (error) {
        console.error('식재료 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchIngredientInfo();
  }, [id]);

  if (!ingredient) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <Searchbar type="ingredients" />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            {ingredient.name} 상세 정보
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <IngredientCard
              ingredientId={ingredient.ingredientId}
              name={ingredient.name}
              unit={ingredient.retailUnit}
              unitSize={ingredient.retailUnitsize}
              image={ingredient.image}
              price={ingredient.price}
              changeRate={ingredient.changeRate}
              changePrice={ingredient.changePrice}
              width={260}
              height={300}
            />
            {/* 추후 다른 카드들이 여기에 추가될 수 있습니다 */}
          </div>
          <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">추가 정보</h2>
            {/* 추가 정보가 있다면 여기에 표시할 수 있습니다 */}
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientDetailPage;
