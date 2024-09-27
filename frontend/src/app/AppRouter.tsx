import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import IngredientListPage from '../pages/IngredientListPage/IngredientList';
import IngredientDetailPage from '../pages/IngredientDetailPage/IngredientDetail';
import { RecipeDetailPage } from '../pages/RecipeDetailPage/RecipeDetail';
import RecipeJjimPage from '../pages/RecipeJjimPage/RecipeJjimDetail';
import Layout from './RoutingLayout/Layout';
import { Error } from '../shared/components';
import { RecipeListPage } from '../pages/RecipeListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
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
