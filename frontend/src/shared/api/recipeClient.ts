import axios, { AxiosInstance } from 'axios';
import {
  RecipeDetailResponse,
  RecipeListResponse,
  RecipeSearchResponse,
} from './recipeTypes';

export default class RecipeClient {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseUrl = import.meta.env.VITE_APP_PRODUCT_URL;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async getRecipes(params: {
    page: number;
    perPage: number;
    keyword?: string;
  }) {
    return this.axiosInstance.get<RecipeListResponse>('/recipe/search', {
      params,
    });
  }

  async getSearchSuggestions(keyword: string) {
    return this.axiosInstance.get<RecipeSearchResponse>(
      `/recipe/search/${keyword}`
    );
  }

  async getRecipeDetail(recipeId: number) {
    return this.axiosInstance.get<RecipeDetailResponse>(`/recipes/${recipeId}`);
  }
}
