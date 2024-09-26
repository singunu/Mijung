import axios from 'axios';

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? `${import.meta.env.VITE_DEV_BACKEND_URL}` // 개발 환경의 API 주소
    : `${import.meta.env.VITE_PROD_BACKEND_URL}`; // 배포 환경의 API 주소

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

export const getIngredientInfo = async (
  ingredientId: number
): Promise<IngredientInfo> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/ingredients/${ingredientId}/info`
    );
    console.log(API_BASE_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('식재료 정보 조회 API 오류:', error);
    throw error;
  }
};
