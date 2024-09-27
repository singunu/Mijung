import axios from 'axios';
import { IngredientResponse } from './ingredientTypes';

// 실제 API와 통신하는 클라이언트 클래스
export default class IngredientClient {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_PRODUCT_URL;
  }

  // 재료 목록을 가져오는 메서드
  async getIngredients(params: {
    page?: number;
    perPage?: number;
    category?: string;
  }) {
    return axios.get<IngredientResponse>(`${this.baseURL}/ingredients/search`, {
      params,
    });
  }
}
