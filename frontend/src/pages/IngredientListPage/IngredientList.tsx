import { useState } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import { IngredientList } from '../../features/ingredientList/ui/IngredientList';
import { useIngredients } from '../../features/ingredientList/api/useIngredients';

const categories = [
  { id: 'all', name: '전체' },
  { id: '100', name: '식량작물' },
  { id: '200', name: '채소류' },
  { id: '300', name: '특용작물' },
  { id: '400', name: '과일류' },
  { id: '500', name: '축산물' },
  { id: '600', name: '수산물' },
];

const IngredientListPage = () => {
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error } = useIngredients(currentPage, 10, category);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearch = (keyword: string) => {
    // 검색 기능 구현
    console.log(keyword); // build용 임시 코드
  };

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <Searchbar type="ingredients" onSearch={handleSearch} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">재료 목록</h1>
          <div className="flex space-x-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-4 py-2 rounded ${
                  category === cat.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => {
                  handleCategoryChange(cat.id);
                  console.log('카테고리 id: ', cat.id);
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : error ? (
            <p>오류가 발생했습니다.</p>
          ) : (
            <IngredientList />
          )}
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientListPage;
