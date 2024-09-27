import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_DEV_BACKEND_API_URL;

export interface MainPageRequest {
  period: 'year' | 'month' | 'week';
  change: 'positive' | 'negative';
  count: number;
}

export interface IngredientPrice {
  ingredientId: number;
  name: string;
  retailUnit: string;
  retailUnitsize: string;
  image: string;
  price: string;
  changeRate: number;
  changePrice: number;
}

export const getIngredientPrices = async (
  params: MainPageRequest
): Promise<IngredientPrice[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ingredients/price`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    console.error('식재료 가격 조회 API 오류:', error);
    throw error;
  }
};
