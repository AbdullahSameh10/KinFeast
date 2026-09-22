import apiClient from "./client";

export interface MarketingSource {
  id: string;
  source_key: string;
  is_active: boolean;
  sort_order: number;
}

interface MarketingSourcesResponse {
  success: boolean;
  sources: MarketingSource[];
}

export const getMarketingSources = async (): Promise<MarketingSource[]> => {
  const response = await apiClient.get<MarketingSourcesResponse>("/marketing/sources");

  return response.data.sources;
};
