import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import Searchbar from '../../widgets/Searchbar/Searchbar';
import { RecipeList } from '../../features/recipeList/ui/RecipeList';

export const RecipeListPage = () => {
  return (
    <div className="grid grid-cols-10">
      <SideLayout />
      <MainLayout>
        <Searchbar type="recipes" />
        {/* <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">레시피 목록</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-gray-600">{recipe.ingredients}</p>
              </div>
            ))}
          </div>
        </div> */}
        <RecipeList />
      </MainLayout>
      <SideLayout />
    </div>
  );
};
