import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import IngredientListPage from '../pages/IngredientListPage/IngredientList';
import IngredientDetailPage from '../pages/IngredientDetailPage/IngredientDetail';
import RecipeListPage from '../pages/RecipeListPage/RecipeList';
import RecipeDetailPage from '../pages/RecipeDetailPage/RecipeDetail';
import RecipeJjimPage from '../pages/RecipeJjimPage/RecipeJjimDetail';
import Layout from './RoutingLayout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Error ! 에러입니다 ! </div>, // 에러 페이지 추후 만들기
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'ingredients',
        element: <IngredientListPage />,
      },
      {
        path: 'ingredients/:id',
        element: <IngredientDetailPage />,
      },
      {
        path: 'recipes',
        element: <RecipeListPage />,
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetailPage />,
      },
      {
        path: 'recipes/jjim',
        element: <RecipeJjimPage />,
      },
    ],
  },
]);
