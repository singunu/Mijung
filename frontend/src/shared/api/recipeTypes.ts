export interface Recipe {
  recipeId: number;
  name: string;
  kind: string;
  image: string;
}

export interface PaginationInfo {
  total: number;
  page: number;
  perPage: number;
}

export interface RecipeResponse {
  data: Recipe[];
  pagination: PaginationInfo;
}
