import React from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
// import { useParams } from 'react-router-dom';

const RecipeDetailPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>();

  // 샘플 데이터
  const recipe = {
    name: '김치찌개',
    ingredients: ['김치', '돼지고기', '두부', '파'],
    instructions: [
      '김치를 적당한 크기로 자릅니다.',
      '돼지고기를 썰어 볶아줍니다.',
      '물을 넣고 김치와 함께 끓입니다.',
      '두부를 넣고 더 끓입니다.',
      '파를 넣고 마무리합니다.',
    ],
    cookingTime: '30분',
    difficulty: '보통',
  };

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">재료</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold mb-4">조리 방법</h2>
            <ol className="list-decimal list-inside text-gray-700 mb-6">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="flex justify-between text-gray-600">
              <p>조리 시간: {recipe.cookingTime}</p>
              <p>난이도: {recipe.difficulty}</p>
            </div>
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default RecipeDetailPage;
