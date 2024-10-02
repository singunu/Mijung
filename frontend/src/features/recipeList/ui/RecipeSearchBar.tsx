import { useSearchSuggestion } from '../api/useSearchSuggestion';
import { Recipe } from '@/shared/api/recipeTypes';
import { useNavigate } from 'react-router-dom';
import { Error } from '@/shared/components';
import { find } from 'underscore';

interface Props {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onKeywordSubmit: (keyword: string) => void;
}

export const RecipeSearchBar = ({ keyword, onKeywordChange }: Props) => {
  const { data: suggestions, error } = useSearchSuggestion(keyword);
  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion: Recipe) => {
    navigate(`/recipes/${suggestion.recipeId}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions === undefined) return;

    const correctKeyword = find(
      suggestions,
      (recipe) => recipe.name === keyword
    );

    if (!correctKeyword) {
      alert('정확한 레시피 이름을 입력해주세요.');
    }
  };

  if (error) {
    console.log('ReacipeSearchBar Error');
    return <Error />;
  }

  return (
    <div className="relative max-w-40 min-w-96 mx-auto">
      <form className="flex items-center" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
          Search
        </button>
      </form>
      {suggestions && suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion: Recipe, index: number) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
