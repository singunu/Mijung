import { useState, useEffect } from 'react';
import SideLayout from '../../app/RoutingLayout/SideLayout';
import MainLayout from '../../app/RoutingLayout/MainLayout';
import IngredientCard from '../../widgets/IngredientCard/IngredientCard';
import { getIngredientPrices, IngredientPrice } from './MainAPI';

const MainPage = () => {
  const [weeklyIngredients, setWeeklyIngredients] = useState<IngredientPrice[]>(
    []
  );
  const [monthlyIngredients, setMonthlyIngredients] = useState<
    IngredientPrice[]
  >([]);
  const [mainIngredients, setMainIngredients] = useState<IngredientPrice[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const [weekly, monthly, main] = await Promise.all([
          getIngredientPrices({ period: 'week', change: 'positive', count: 6 }),
          getIngredientPrices({
            period: 'month',
            change: 'positive',
            count: 4,
          }),
          getIngredientPrices({ period: 'year', change: 'positive', count: 4 }),
        ]);

        setWeeklyIngredients(weekly);
        setMonthlyIngredients(monthly);
        setMainIngredients(main);
      } catch (error) {
        console.error('식재료 데이터 가져오기 실패:', error);
      }
    };

    fetchIngredients();
  }, []);

  const renderIngredientCards = (ingredients: IngredientPrice[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {ingredients?.map((ingredient) => (
        <IngredientCard
          key={ingredient?.ingredientId ?? `ingredient-${Math.random()}`}
          ingredient={ingredient ?? {}}
        />
      )) ?? <p>데이터를 불러오는 중입니다...</p>}
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
            {renderIngredientCards(weeklyIngredients ?? [])}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">월간 시세</h2>
            {renderIngredientCards(monthlyIngredients ?? [])}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">주요 식재료</h2>
            {renderIngredientCards(mainIngredients ?? [])}
          </section>
        </div>
      </MainLayout>
      <SideLayout />
    </div>
  );
};

export default MainPage;
