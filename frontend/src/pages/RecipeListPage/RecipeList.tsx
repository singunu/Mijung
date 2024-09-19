import React from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';

const sampleRecipes = [
  { id: '1', name: '김치찌개', ingredients: '김치, 돼지고기, 두부' },
  { id: '2', name: '비빔밥', ingredients: '밥, 나물, 고추장' },
  { id: '3', name: '불고기', ingredients: '소고기, 양파, 당근' },
];

const RecipeList: React.FC = () => {
  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">레시피 목록</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-gray-600">{recipe.ingredients}</p>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default RecipeList;
