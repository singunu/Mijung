import axios from 'axios';
import { mockData } from '../../shared/api/mock';

const API_BASE_URL = '/api/v1';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

interface SearchParams {
  keyword: string;
  page: number;
  perPage: number;
}

// API 함수
export const getIngredientAutoComplete = async (search: string) => {
  if (USE_MOCK_API) {
    return mockData.ingredients.filter((item) => item.word.includes(search));
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/ingredients/search/${search}`
    );
    return response.data.data;
  } catch (error) {
    console.error('식재료 자동완성 API 오류:', error);
    return [];
  }
};

export const getRecipeAutoComplete = async (search: string) => {
  if (USE_MOCK_API) {
    return mockData.recipes.filter((item) => item.word.includes(search));
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/recipes/search/${search}`
    );
    return response.data.data;
  } catch (error) {
    console.error('레시피 자동완성 API 오류:', error);
    return [];
  }
};

export const searchIngredients = async ({
  keyword,
  page,
  perPage,
}: SearchParams) => {
  if (USE_MOCK_API) {
    const filteredData = mockData.ingredients.filter((item) =>
      item.name.includes(keyword)
    );
    return {
      data: filteredData.slice((page - 1) * perPage, page * perPage),
      pagination: {
        total: filteredData.length,
        page,
        perPage,
      },
    };
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/ingredients/search`, {
      params: { keyword, page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error('식재료 검색 API 오류:', error);
    throw error;
  }
};

export const searchRecipes = async ({
  keyword,
  page,
  perPage,
}: SearchParams) => {
  if (USE_MOCK_API) {
    const filteredData = mockData.recipes.filter((item) =>
      item.word.includes(keyword)
    );
    return {
      data: filteredData.slice((page - 1) * perPage, page * perPage),
      pagination: {
        total: filteredData.length,
        page,
        perPage,
      },
    };
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/recipes/search`, {
      params: { keyword, page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error('레시피 검색 API 오류:', error);
    throw error;
  }
};
