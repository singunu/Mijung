/**
1. Searchbar 컴포넌트는 'ingredients' 또는 'recipes' 타입을 props로 받아 식재료 검색인지 레시피 검색인지 구분합니다.
사용자가 입력할 때마다 300ms 후에 자동완성 API를 호출합니다.
자동완성 결과는 드롭다운 형태로 표시되며, 사용자가 선택할 수 있습니다.
4. Enter 키를 누르거나 검색 버튼을 클릭하면 검색 API를 호출합니다.
5. SearchbarAPI.ts 파일에는 자동완성과 검색을 위한 API 호출 함수가 구현되어 있습니다.
6. Tailwind CSS를 사용하여 검색창과 드롭다운의 스타일을 적용했습니다.
이 컴포넌트를 사용할 때는 다음과 같이 사용할 수 있습니다:
<Searchbar type="ingredients" />
또는
<Searchbar type="recipes" />
 */
import { useState, useEffect, useRef } from 'react';
import {
  getIngredientAutoComplete,
  getRecipeAutoComplete,
  searchIngredients,
  searchRecipes,
} from './SearchbarAPI';

interface SearchbarProps {
  type: 'ingredients' | 'recipes';
}

const Searchbar = ({ type }: SearchbarProps) => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<
    Array<{ id: number; word: string }>
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (keyword.length > 0) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fetchAutoComplete();
      }, 300);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [keyword]);

  const fetchAutoComplete = async () => {
    try {
      const data =
        type === 'ingredients'
          ? await getIngredientAutoComplete(keyword)
          : await getRecipeAutoComplete(keyword);
      setSuggestions(data);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error('자동완성 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const handleSearch = async () => {
    try {
      if (type === 'ingredients') {
        const result = await searchIngredients({
          keyword,
          page: 1,
          perPage: 8,
        });
        console.log('식재료 검색 결과:', result);
      } else {
        const result = await searchRecipes({ keyword, page: 1, perPage: 8 });
        console.log('레시피 검색 결과:', result);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={type === 'ingredients' ? '식재료 검색' : '레시피 검색'}
      />
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setKeyword(item.word);
                setIsDropdownOpen(false);
              }}
            >
              {item.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
