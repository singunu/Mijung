import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import { searchIngredients } from '../../widgets/Searchbar/SearchbarAPI';

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
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchIngredients = async (page = 1, searchKeyword = keyword) => {
    setIsLoading(true);
    try {
      const result = await searchIngredients({
        category,
        page,
        perPage: 10,
        keyword: searchKeyword,
      });
      console.log('API 응답:', result);
      if (result && result.data) {
        setIngredients(result.data);
        setCurrentPage(result.pagination.page);
        setTotalPages(
          Math.ceil(result.pagination.total / result.pagination.perPage)
        );
      } else {
        console.error('API 응답에 예상된 데이터가 없습니다:', result);
        setIngredients([]);
      }
    } catch (error) {
      console.error('식재료 목록을 가져오는 데 실패했습니다:', error);
      setIngredients([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    fetchIngredients(1, searchKeyword);
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
                onClick={() => handleCategoryChange(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {isLoading ? (
            <p>로딩 중...</p>
          ) : ingredients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ingredients.map((ingredient) => (
                <IngredientCard
                  key={ingredient.ingredientId}
                  ingredientId={ingredient.ingredientId}
                  name={ingredient.name}
                  unit={ingredient.retailUnit}
                  unitSize={ingredient.retailUnitsize}
                  image={ingredient.image}
                  price={ingredient.price}
                  changeRate={ingredient.changeRate}
                  changePrice={ingredient.changePrice}
                />
              ))}
            </div>
          ) : (
            <p>표시할 식재료가 없습니다.</p>
          )}
          {!isLoading && ingredients.length > 0 && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`mx-1 px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}
                    onClick={() => fetchIngredients(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default IngredientListPage;
