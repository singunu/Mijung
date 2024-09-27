// ingredient 데이터 타입 정의

export interface Ingredient {
  ingredientId: number;
  name: string;
  retailUnit: string;
  retailUnitsize: string;
  image: string;
  price: string;
  changeRate: number;
  changePrice: number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  perPage: number;
}

export interface IngredientResponse {
  data: Ingredient[];
  pagination: PaginationInfo;
}
