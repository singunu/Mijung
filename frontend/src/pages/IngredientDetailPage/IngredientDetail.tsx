import React from 'react';
// import { useParams } from 'react-router-dom';

const IngredientDetailPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>();

  // 샘플 데이터
  const ingredient = {
    name: '김치',
    description:
      '한국의 전통 발효 식품으로, 배추와 다양한 양념을 사용하여 만듭니다.',
    nutritionFacts: '비타민 C, 식이섬유가 풍부합니다.',
    usageInRecipes: ['김치찌개', '김치볶음밥', '김치전'],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{ingredient.name} 상세 정보</h1>
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
  );
};

export default IngredientDetailPage;
