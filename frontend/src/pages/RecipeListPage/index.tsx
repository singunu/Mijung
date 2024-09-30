import SideLayout from '@/app/RoutingLayout/SideLayout';
import MainLayout from '@/app/RoutingLayout/MainLayout';
import { RecipeList } from '@/features/recipeList/ui/RecipeList';
import { RecipeSearchBar } from '@/features/recipeList/ui/RecipeSearchBar';

export const RecipeListPage = () => {
  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <RecipeSearchBar />
        <RecipeList />
      </MainLayout>
      <SideLayout />
    </div>
  );
};
