import React from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';

import { Link } from 'react-router-dom';

const IngredientListPage: React.FC = () => {
  const ingredients = [
    { id: 1, name: '쌀', description: '한국 요리의 기본이 되는 주식입니다.' },
    { id: 2, name: '김치', description: '한국의 대표적인 발효 식품입니다.' },
    { id: 3, name: '고추장', description: '매콤한 맛을 내는 발효 양념입니다.' },
    { id: 4, name: '된장', description: '구수한 맛을 내는 발효 양념입니다.' },
    { id: 5, name: '간장', description: '짭짤한 맛을 내는 필수 양념입니다.' },
    { id: 6, name: '마늘', description: '향긋한 맛을 더해주는 향신료입니다.' },
  ];

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">재료 목록</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => (
              <Link
                key={ingredient.id}
                to={`/ingredients/${ingredient.id}`}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {ingredient.name}
                </h2>
                <p className="text-gray-600">{ingredient.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientListPage;
