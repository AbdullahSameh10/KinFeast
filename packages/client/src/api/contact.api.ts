import apiClient from "./client";

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
}

export const submitContactMessage = async (
  input: ContactMessageInput,
): Promise<ContactMessageResponse> => {
  const response =
    await apiClient.post<ContactMessageResponse>(
      "/contact",
      input,
    );

  return response.data;
};