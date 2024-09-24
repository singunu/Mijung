import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import { IngredientInfo } from '../../widgets/IngredientCard/IngredientCardAPI';
import { mockData } from '../../shared/api/mock';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

const MainPage = () => {
  const [weeklyIngredients, setWeeklyIngredients] = useState<IngredientInfo[]>(
    []
  );
  const [monthlyIngredients, setMonthlyIngredients] = useState<
    IngredientInfo[]
  >([]);
  const [mainIngredients, setMainIngredients] = useState<IngredientInfo[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (USE_MOCK_API) {
        const ingredients = mockData.ingredients.map((ingredient) => ({
          ingredientId: ingredient.id,
          name: ingredient.name,
          retailUnit: ingredient.retailUnit,
          retailUnitsize: ingredient.retailUnitsize,
          image: ingredient.image,
          price: ingredient.price,
          changeRate: ingredient.changeRate,
          changePrice: ingredient.changePrice,
        }));

        setWeeklyIngredients(ingredients.slice(0, 6));
        setMonthlyIngredients(ingredients.slice(6, 10));
        setMainIngredients(ingredients.slice(10, 14));
      } else {
        // 실제 API 호출 (아직 구현되지 않음)
        console.log('실제 API 호출이 필요합니다.');
        // TODO: 실제 API 호출 구현
      }
    };

    fetchIngredients();
  }, []);

  const renderIngredientCards = (ingredients: IngredientInfo[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ingredients.map((ingredient) => (
        <IngredientCard
          key={ingredient.ingredientId}
          ingredient={ingredient}
          width={170}
          height={250}
        />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10">
      <SideLayout />
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">메인 페이지</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">주간 시세</h2>
            {renderIngredientCards(weeklyIngredients)}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">월간 시세</h2>
            {renderIngredientCards(monthlyIngredients)}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">주요 식재료</h2>
            {renderIngredientCards(mainIngredients)}
          </section>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default MainPage;
