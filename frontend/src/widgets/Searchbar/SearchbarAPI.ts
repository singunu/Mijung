import axios from 'axios';

const API_BASE_URL = '/api/v1';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

interface SearchParams {
  keyword: string;
  page: number;
  perPage: number;
}

// 모의 데이터
const mockIngredients = [
  { id: 1, word: '감자' },
  { id: 2, word: '고구마' },
  { id: 3, word: '당근' },
  { id: 4, word: '양파' },
  { id: 5, word: '마늘' },
];

const mockRecipes = [
  { id: 1, word: '감자전' },
  { id: 2, word: '고구마맛탕' },
  { id: 3, word: '당근케이크' },
  { id: 4, word: '양파볶음' },
  { id: 5, word: '마늘빵' },
];

// API 함수
export const getIngredientAutoComplete = async (search: string) => {
  if (USE_MOCK_API) {
    return mockIngredients.filter((item) => item.word.includes(search));
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
    return mockRecipes.filter((item) => item.word.includes(search));
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
    const filteredData = mockIngredients.filter((item) =>
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
    const filteredData = mockRecipes.filter((item) =>
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
