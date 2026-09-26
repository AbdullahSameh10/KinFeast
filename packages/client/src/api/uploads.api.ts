import apiClient from "./client";

interface UploadRecipeImageResponse {
  success: boolean;
  image?: {
    url: string;
    publicId: string;
    width: number;
    height: number;
  };
  message?: string;
}

export async function uploadRecipeImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("image", file);

  const response = await apiClient.post<UploadRecipeImageResponse>(
    "/uploads/recipe-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  if (!response.data.success || !response.data.image?.url) {
    throw new Error(
      response.data.message ?? "Unable to upload recipe image.",
    );
  }

  return response.data.image.url;
}