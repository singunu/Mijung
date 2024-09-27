import axios from 'axios';
import { RecipeListResponse, RecipeSearchResponse } from './recipeTypes';

export default class RecipeClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_PRODUCT_URL;
  }

  async getRecipes(params: {
    page: number;
    perPage: number;
    keyword?: string;
  }) {
    return axios.get<RecipeListResponse>(`${this.baseUrl}/recipe/search`, {
      params,
    });
  }

  async getSearchSuggestions(keyword: string) {
    return axios.get<RecipeSearchResponse>(
      `${this.baseUrl}/recipe/search/${keyword}`
    );
  }
}
