export interface CreateCuisineInput {
  name: string;
}
export interface UpdateCuisineInput {
  name?: string;
}
export interface Cuisine {
  id: string;
  name: string;
  created_at: string;
}
