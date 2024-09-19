import { useParams } from 'react-router-dom';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';

const IngredientDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // 샘플 데이터
  const ingredients = {
    '1': {
      name: '김치',
      description:
        '한국의 전통 발효 식품으로, 배추와 다양한 양념을 사용하여 만듭니다.',
      nutritionFacts: '비타민 C, 식이섬유가 풍부합니다.',
      usageInRecipes: ['김치찌개', '김치볶음밥', '김치전'],
    },
    '2': {
      name: '감자',
      description: '탄수화물이 풍부한 뿌리 채소로, 다양한 요리에 사용됩니다.',
      nutritionFacts: '비타민 C, 칼륨이 풍부합니다.',
      usageInRecipes: ['감자전', '감자조림', '감자탕'],
    },
    '3': {
      name: '양파',
      description:
        '강한 향과 맛을 가진 채소로, 요리의 기본 재료로 많이 사용됩니다.',
      nutritionFacts: '비타민 C, 퀘르세틴이 풍부합니다.',
      usageInRecipes: ['양파볶음', '양파스프', '양파링'],
    },
  };

  const ingredient = ingredients[id as keyof typeof ingredients] || {
    name: '알 수 없는 재료',
    description: '해당 ID의 재료 정보를 찾을 수 없습니다.',
    nutritionFacts: '정보 없음',
    usageInRecipes: [],
  };

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">
            {ingredient.name} 상세 정보
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">설명</h2>
            <p className="text-gray-700 mb-4">{ingredient.description}</p>

            <h2 className="text-2xl font-semibold mb-4">영양 정보</h2>
            <p className="text-gray-700 mb-4">{ingredient.nutritionFacts}</p>

            <h2 className="text-2xl font-semibold mb-4">사용되는 레시피</h2>
            <ul className="list-disc list-inside text-gray-700">
              {ingredient.usageInRecipes.map((recipe, index) => (
                <li key={index}>{recipe}</li>
              ))}
            </ul>
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientDetailPage;
