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
  { id: 1, word: '사과' },
  { id: 2, word: '배' },
  { id: 3, word: '바나나' },
  { id: 4, word: '당근' },
  { id: 5, word: '닭가슴살' },
  { id: 6, word: '달걀' },
  { id: 7, word: '우유' },
  { id: 8, word: '두유' },
  { id: 9, word: '토마토' },
  { id: 10, word: '방울토마토' },
  { id: 11, word: '양파' },
  { id: 12, word: '감자' },
  { id: 13, word: '고구마' },
  { id: 14, word: '브로콜리' },
  { id: 15, word: '시금치' },
  { id: 16, word: '오이' },
  { id: 17, word: '파프리카' },
  { id: 18, word: '버섯' },
  { id: 19, word: '표고버섯' },
  { id: 20, word: '새송이버섯' },
  { id: 21, word: '마늘' },
  { id: 22, word: '생강' },
  { id: 23, word: '대파' },
  { id: 24, word: '쪽파' },
  { id: 25, word: '고추' },
  { id: 26, word: '청양고추' },
  { id: 27, word: '홍고추' },
  { id: 28, word: '호박' },
  { id: 29, word: '애호박' },
  { id: 30, word: '단호박' },
  { id: 31, word: '단호박1' },
  { id: 32, word: '단호박2' },
  { id: 33, word: '단호박3' },
  { id: 34, word: '단호박3' },
];

const mockRecipes = [
  { id: 1, word: '김치찌개' },
  { id: 2, word: '된장찌개' },
  { id: 3, word: '부대찌개' },
  { id: 4, word: '비빔밥' },
  { id: 5, word: '불고기' },
  { id: 6, word: '삼겹살' },
  { id: 7, word: '파스타' },
  { id: 8, word: '크림파스타' },
  { id: 9, word: '토마토파스타' },
  { id: 10, word: '피자' },
  { id: 11, word: '스테이크' },
  { id: 12, word: '샐러드' },
  { id: 13, word: '시저샐러드' },
  { id: 14, word: '오믈렛' },
  { id: 15, word: '라면' },
  { id: 16, word: '김밥' },
  { id: 17, word: '참치김밥' },
  { id: 18, word: '떡볶이' },
  { id: 19, word: '치즈떡볶이' },
  { id: 20, word: '치킨' },
  { id: 21, word: '양념치킨' },
  { id: 22, word: '후라이드치킨' },
  { id: 23, word: '카레' },
  { id: 24, word: '짜장면' },
  { id: 25, word: '짬뽕' },
  { id: 26, word: '초밥' },
  { id: 27, word: '연어초밥' },
  { id: 28, word: '돈까스' },
  { id: 29, word: '치즈돈까스' },
  { id: 30, word: '고구마맛탕' },
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
