import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">샘플 페이지</h1>
        <div>
          <button className="text-white mr-4 hover:text-gray-200">
            로그인
          </button>
          <button className="text-white hover:text-gray-200">회원가입</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
