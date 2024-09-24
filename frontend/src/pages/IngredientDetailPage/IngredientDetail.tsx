import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import {
  getIngredientInfo,
  IngredientInfo,
} from '../../widgets/IngredientCard/IngredientCardAPI';

const IngredientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<IngredientInfo | null>(null);

  useEffect(() => {
    const fetchIngredientInfo = async () => {
      try {
        const data = await getIngredientInfo(Number(id));
        setIngredient(data);
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
          <div className="flex justify-center mb-8">
            <IngredientCard ingredient={ingredient} width={260} height={260} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            {/* 추가 정보는 나중에 여기에 추가될 예정입니다 */}
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientDetailPage;
