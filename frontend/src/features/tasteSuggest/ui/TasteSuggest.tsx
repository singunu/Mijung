import React, { useState, useEffect, useCallback } from 'react';
import { MyIngredients } from './MyIngredients';
import { RecommendedIngredients } from './RecommendedIngredients';
import { RecommendedRecipes } from './RecommendedRecipes';
import {
  useIngredientRecommendations,
  useRecipeRecommendations,
} from '../api/useTasteSuggest';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

export const TasteSuggest = () => {
  const [myIngredients, setMyIngredients] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data: recommendedIngredients, refetch: refetchIngredients } =
    useIngredientRecommendations(myIngredients.map((i) => i.id));
  const { data: recommendedRecipes, refetch: refetchRecipes } =
    useRecipeRecommendations(myIngredients.map((i) => i.id));

  useEffect(() => {
    const storedIngredients = localStorage.getItem('myIngredients');
    if (storedIngredients) {
      setMyIngredients(JSON.parse(storedIngredients));
    }
  }, []);

  const saveToLocalStorage = useCallback(
    (ingredients: Array<{ id: number; name: string }>) => {
      localStorage.setItem('myIngredients', JSON.stringify(ingredients));
    },
    []
  );

  const handleAddIngredient = useCallback(
    (id: number, name: string) => {
      setMyIngredients((prev) => {
        if (prev.some((ingredient) => ingredient.id === id)) {
          return prev; // 이미 존재하는 경우 추가하지 않음
        }
        const newIngredients = [...prev, { id, name }];
        saveToLocalStorage(newIngredients);
        return newIngredients;
      });
    },
    [saveToLocalStorage]
  );

  const handleRemoveIngredient = useCallback(
    (id: number) => {
      setMyIngredients((prev) => {
        const newIngredients = prev.filter((i) => i.id !== id);
        saveToLocalStorage(newIngredients);
        return newIngredients;
      });
    },
    [saveToLocalStorage]
  );

  const handleClearIngredients = useCallback(() => {
    setMyIngredients([]);
    saveToLocalStorage([]);
  }, [saveToLocalStorage]);

  const handleGetRecommendations = () => {
    refetchIngredients();
    refetchRecipes();
  };

  const content = (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-500 hover:shadow-xl">
      <div className="p-6">
        <MyIngredients
          ingredients={myIngredients}
          onRemove={handleRemoveIngredient}
          onClear={handleClearIngredients}
        />
        <button
          onClick={handleGetRecommendations}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full uppercase font-bold text-sm hover:bg-blue-600 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          추천 받기
        </button>
        {recommendedIngredients && (
          <RecommendedIngredients
            ingredients={recommendedIngredients}
            onAdd={handleAddIngredient}
          />
        )}
        {recommendedRecipes && (
          <RecommendedRecipes recipes={recommendedRecipes} />
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          추천
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 text-3xl text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            {content}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-500 hover:shadow-xl">
      {content}
    </div>
  );
};

// TasteSuggestContext 생성
export const TasteSuggestContext = React.createContext<{
  handleAddIngredient: (id: number, name: string) => void;
}>({
  handleAddIngredient: () => {},
});
