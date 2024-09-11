import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage/LandingPage';
import MainPage from '../../pages/MainPage/MainPage';
import IngredientListPage from '../../pages/IngredientListPage/IngredientList';
import IngredientDetailPage from '../../pages/IngredientDetailPage/IngredientDetail';
import RecipeListPage from '../../pages/RecipeListPage/RecipeList';
import RecipeDetailPage from '../../pages/RecipeDetailPage/RecipeDetail';
import RecipeJjimPage from '../../pages/RecipeJjimPage/RecipeJjimDetail';

const RouterProvider: React.FC = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/ingredients" element={<IngredientListPage />} />
    <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
    <Route path="/recipes" element={<RecipeListPage />} />
    <Route path="/recipes/:id" element={<RecipeDetailPage />} />
    <Route path="/jjim" element={<RecipeJjimPage />} />
  </Routes>
);

export default RouterProvider;
