import axios from 'axios';
import { mockData } from '../../shared/api/mock';

const API_BASE_URL = '/api/v1';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export interface IngredientSiseRequest {
  period: string;
  change: string;
  count: number;
}

export interface IngredientInfo {
  ingredientId: number;
  name: string;
  retailUnit: string;
  retailUnitsize: string;
  image: string;
  price: string;
  changeRate: number;
  changePrice: number;
}

export const getIngredientSise = async (
  params: IngredientSiseRequest
): Promise<IngredientInfo[]> => {
  if (USE_MOCK_API) {
    return mockData.ingredients.slice(0, params.count).map((ingredient) => ({
      ingredientId: ingredient.id,
      name: ingredient.name,
      retailUnit: ingredient.retailUnit,
      retailUnitsize: ingredient.retailUnitsize,
      image: ingredient.image,
      price: ingredient.price,
      changeRate: ingredient.changeRate,
      changePrice: ingredient.changePrice,
    }));
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/ingredients/sise`, {
      params,
    });
    return response.data.data;
  } catch (error) {
    console.error('식재료 시세 조회 API 오류:', error);
    throw error;
  }
};

export const getIngredientInfo = async (
  ingredientId: number
): Promise<IngredientInfo> => {
  if (USE_MOCK_API) {
    const ingredient = mockData.ingredients.find((i) => i.id === ingredientId);
    if (!ingredient) {
      throw new Error('식재료를 찾을 수 없습니다.');
    }
    return {
      ingredientId: ingredient.id,
      name: ingredient.name,
      retailUnit: ingredient.retailUnit,
      retailUnitsize: ingredient.retailUnitsize,
      image: ingredient.image,
      price: ingredient.price,
      changeRate: ingredient.changeRate,
      changePrice: ingredient.changePrice,
    };
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/ingredients/${ingredientId}`
    );
    return response.data.data;
  } catch (error) {
    console.error('식재료 정보 조회 API 오류:', error);
    throw error;
  }
};
