import FakeIngredientClient from '../../../shared/api/fakeIngredientClient';
import IngredientClient from '../../../shared/api/ingredientClient';
import {
  PaginationInfo,
  Ingredient,
} from '../../../shared/api/ingredientTypes';

// 재료 API를 추상화한 클래스
export default class IngredientApi {
  private client: IngredientClient | FakeIngredientClient;

  constructor(client: IngredientClient | FakeIngredientClient) {
    this.client = client;
  }

  // 재료 목록을 가져오는 메서드
  async getIngredients(
    page: number = 1,
    perPage: number = 10
  ): Promise<{
    ingredients: Ingredient[];
    pagination: PaginationInfo;
  }> {
    const res = await this.client.getIngredients({ page, perPage });
    return {
      ingredients: res.data.data,
      pagination: res.data.pagination,
    };
  }
}
