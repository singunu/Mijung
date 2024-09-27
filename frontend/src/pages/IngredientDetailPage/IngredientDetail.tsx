import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import PriceGraphCard from '../../widgets/PriceGraphCard/PriceGraphCard';
import NetworkGraphCard from '../../widgets/NetworkGraphCard/NetworkGraphCard';
import { getIngredientInfo, IngredientInfo } from './IngredientDetailAPI';

const IngredientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<IngredientInfo | null>(null);
  const navigate = useNavigate();

  const handleSearch = (keyword: string) => {
    // 검색 결과 페이지로 이동
    navigate(`/search/ingredients?keyword=${encodeURIComponent(keyword)}`);
  };

  useEffect(() => {
    const fetchIngredientInfo = async () => {
      try {
        if (id) {
          const data = await getIngredientInfo(Number(id));
          if (data) {
            setIngredient(data);
          } else {
            console.error('식재료 정보가 없습니다.');
          }
        }
      } catch (error) {
        console.error('식재료 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchIngredientInfo();
  }, [id]);

  // ingredient에 response가 들어왔을 때 체크용
  useEffect(() => {
    if (ingredient) {
      console.log('ingredient is', ingredient);
    }
  }, [ingredient]);

  if (!ingredient) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <Searchbar type="ingredients" onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            {ingredient.name} 상세 정보
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <IngredientCard ingredient={ingredient} />
            </div>
            <div className="lg:w-3/4 flex flex-col gap-8">
              <PriceGraphCard
                graphId={ingredient.ingredientId ?? 0}
                title={`${ingredient.name ?? '알 수 없음'} 가격 추이`}
                width={600}
                height={200}
              />
              <NetworkGraphCard
                graphId={ingredient.ingredientId ?? 0}
                title={`${ingredient.name ?? '알 수 없음'} 관련 네트워크`}
                width={600}
                height={200}
              />
            </div>
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
