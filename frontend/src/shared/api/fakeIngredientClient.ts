import axios from 'axios';
import { IngredientResponse, IngredientSiseRequest } from './ingredientTypes';

// 개발 환경에서 사용할 가짜 API 클라이언트 클래스
export default class FakeIngredientClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_DEV_URL;
  }

  // 가짜 재료 목록을 가져오는 메서드
  async getIngredients(params: { page?: number; perPage?: number }) {
    return axios.get<IngredientResponse>(
      `${this.baseUrl}public/data/ingredient-search.json`,
      { params }
    );
  }

  async getIngredientSise(params: IngredientSiseRequest) {
    const response = await axios.get<any>(
      `${this.baseUrl}public/data/ingredient-sise.json`
    );
    const { period, change, count } = params;
    const filteredData = response.data[period][change].slice(0, count);
    return { data: { data: filteredData } };
  }
}
