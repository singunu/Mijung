import axios from 'axios';
import { RecipeResponse } from './recipeTypes';

export default class FakeRecipeClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_DEV_URL;
  }

  async getRecipes(params: { page?: number; perPage?: number }) {
    console.log(this.baseUrl);

    return axios.get<RecipeResponse>(
      `${this.baseUrl}public/data/recipe-search.json`,
      {
        params,
      }
    );
  }
}
