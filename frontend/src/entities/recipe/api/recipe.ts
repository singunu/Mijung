import FakeRecipeClient from '../../../shared/api/fakeRecipeClient';
import RecipeClient from '../../../shared/api/recipeClient';
import { PaginationInfo, Recipe } from '../../../shared/api/recipeTypes';

export default class RecipeApi {
  private client: RecipeClient | FakeRecipeClient;

  constructor(client: RecipeClient | FakeRecipeClient) {
    this.client = client;
  }

  async getRecipes(
    page: number = 1,
    perPage: number = 10
  ): Promise<{
    recipes: Recipe[];
    pagination: PaginationInfo;
  }> {
    const res = await this.client.getRecipes({ page, perPage });
    return {
      recipes: res.data.data,
      pagination: res.data.pagination,
    };
  }
}
