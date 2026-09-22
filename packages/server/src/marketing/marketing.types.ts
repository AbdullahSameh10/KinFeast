export interface MarketingSource {
  id: string;
  source_key: string;
  is_active: boolean;
  sort_order: number;
}
export interface MarketingAttributionInput {
  userId: string;
  sourceId: string;
  otherDetails?: string | null;
}
