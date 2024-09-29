import axios, { AxiosResponse } from 'axios';
import {
  IngredientResponse,
  IngredientSiseRequest,
  IngredientSiseResponse,
  IngredientInfo,
} from './ingredientTypes';

// 실제 API와 통신하는 클라이언트 클래스
const API_BASE_URL = import.meta.env.VITE_APP_PRODUCT_URL;

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
  // 메인페이지 재료 가격 추이 데이터 가져오는 메서드
  async getIngredientSise(
    params: IngredientSiseRequest
  ): Promise<AxiosResponse<IngredientSiseResponse>> {
    return axios.get<IngredientSiseResponse>(
      `${API_BASE_URL}/ingredients/price`,
      { params }
    );
  }

  async getIngredientInfo(
    ingredientId: number
  ): Promise<AxiosResponse<{ data: IngredientInfo }>> {
    return axios.get<{ data: IngredientInfo }>(
      `${this.baseURL}/ingredients/${ingredientId}/info`
    );
  }
}
