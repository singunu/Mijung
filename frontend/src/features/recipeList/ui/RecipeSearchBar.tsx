import { useSearchSuggestion } from '../api/useSearchSuggestion';
import { Recipe } from '@/shared/api/recipeTypes';
import { Error } from '@/shared/components';
import { KeyboardEvent, useEffect, useState } from 'react';

interface Props {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSubmit: (keyword: string) => void;
}

export const RecipeSearchBar = ({
  keyword,
  onKeywordChange,
  onSubmit,
}: Props) => {
  const { data: suggestions, error } = useSearchSuggestion(keyword);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleSuggestionClick = (suggestion: Recipe) => {
    onSubmit(suggestion.name);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions === undefined) return;

    if (selectedIndex !== -1 && suggestions[selectedIndex]) {
      onSubmit(suggestions[selectedIndex].name);
    } else {
      onSubmit(keyword);
    }
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        setSelectedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
        setShowSuggestions(true);
        e.preventDefault();
        break;

      case 'ArrowUp':
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
        setShowSuggestions(true);
        e.preventDefault();
        break;

      case 'Enter':
        if (selectedIndex !== -1) {
          onSubmit(suggestions[selectedIndex].name);
          setShowSuggestions(false);
          e.preventDefault();
        }
        break;

      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
    setShowSuggestions(!!suggestions && suggestions.length > 0);
  }, [suggestions]);

  const handleInputFocus = () => {
    setShowSuggestions(!!suggestions && suggestions.length > 0);
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
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
          Search
        </button>
      </form>
      {showSuggestions && suggestions && suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion: Recipe, index: number) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                index === selectedIndex ? 'bg-gray-200' : ''
              }`}
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
