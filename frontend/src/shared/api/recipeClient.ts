import axios from 'axios';
import { RecipeResponse } from './recipeTypes';

export default class RecipeClient {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_PRODUCT_URL;
  }

  async getRecipes(params: { page?: number; perPage?: number }) {
    return axios.get<RecipeResponse>(`${this.baseURL}/recipe`, { params });
  }
}
