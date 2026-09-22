export interface CreateReviewInput {
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export interface Review {
  id: string;
  user_id: string;
  recipe_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}
