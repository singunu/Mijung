import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-6">
        맛있는 레시피의 세계에 오신 것을 환영합니다
      </h1>
      <p className="text-xl mb-8">당신만의 요리 여행을 시작해보세요</p>
      <div className="space-x-4">
        <Link
          to="/main"
          className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          시작하기
        </Link>
        <Link
          to="/recipes"
          className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-500 transition duration-300"
        >
          레시피 둘러보기
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
