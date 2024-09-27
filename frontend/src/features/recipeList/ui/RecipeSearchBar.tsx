import { useState } from 'react';
import { useSearchSuggestion } from '../api/useSearchSuggestion';
import { Recipe } from '@/shared/api/recipeTypes';

export const RecipeSearchBar = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data: suggestions } = useSearchSuggestion(keyword);

  const handleInputChange = (inputWord: string) => {
    setKeyword(inputWord);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
          Search
        </button>
      </div>
      {suggestions && suggestions.length > 0 && (
        <ul className="mt-2 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion: Recipe, index: number) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setKeyword(suggestion.name)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
