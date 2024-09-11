import React from 'react';

const IngredientListPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">재료 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['쌀', '김치', '고추장', '된장', '간장', '마늘'].map(
          (ingredient, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">{ingredient}</h2>
              <p className="text-gray-600">이 재료에 대한 간단한 설명입니다.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default IngredientListPage;
