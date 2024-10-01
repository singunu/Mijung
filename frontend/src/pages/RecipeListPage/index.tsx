import SideLayout from '@/app/RoutingLayout/SideLayout';
import MainLayout from '@/app/RoutingLayout/MainLayout';
import { RecipeList } from '@/features/recipeList/ui/RecipeList';
import { RecipeSearchBar } from '@/features/recipeList/ui/RecipeSearchBar';
import { useState } from 'react';

export const RecipeListPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const handleKeywordChange = (inputWord: string) => {
    setKeyword(inputWord);
  };

  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <RecipeSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
        />
        <RecipeList keyword={keyword} />
      </MainLayout>
      <SideLayout />
    </div>
  );
};
