import React from 'react';
// GPT sample page
const MainPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">메인 페이지</h1>
      <p className="mb-4">환영합니다! 이곳은 메인 페이지입니다.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">최근 레시피</h2>
          <ul className="list-disc list-inside">
            <li>김치찌개</li>
            <li>비빔밥</li>
            <li>불고기</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">인기 재료</h2>
          <ul className="list-disc list-inside">
            <li>김치</li>
            <li>고추장</li>
            <li>된장</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
