import React from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';

const RecipeJjimDetail: React.FC = () => {
  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">레시피 찜 상세 페이지</h1>
          <p className="text-gray-700 text-center">
            여기에 레시피 상세 정보가 표시됩니다.
          </p>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default RecipeJjimDetail;
