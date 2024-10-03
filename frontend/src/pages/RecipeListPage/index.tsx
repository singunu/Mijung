import LeftSideLayout from '@/app/RoutingLayout/LeftSideLayout';
import MainLayout from '@/app/RoutingLayout/MainLayout';
import RightSideLayout from '@/app/RoutingLayout/RightSideLayout';
import { RecipeList } from '@/features/recipeList/ui/RecipeList';
import { RecipeSearchBar } from '@/features/recipeList/ui/RecipeSearchBar';
import { useState } from 'react';

export const RecipeListPage = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [submittedKeyword, setSubmittedKeyword] = useState<string>('');

  const handleKeywordChange = (inputWord: string) => {
    setKeyword(inputWord);
  };

  const handleSubmit = (submittedWord: string) => {
    setSubmittedKeyword(submittedWord);
  };

  return (
    <div className="grid grid-cols-10">
      <LeftSideLayout />
      <MainLayout>
        <RecipeSearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          onSubmit={handleSubmit}
        />
        <RecipeList keyword={submittedKeyword} />
      </MainLayout>
      <RightSideLayout />
    </div>
  );
};
