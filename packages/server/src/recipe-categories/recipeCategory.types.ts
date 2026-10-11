export interface RecipeCategory {
id: number;
name: string;
slug: string;
image_url: string | null;
created_at: string;
recipe_count?: number;
}