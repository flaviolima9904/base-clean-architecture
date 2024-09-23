export interface IReverseGeocodeResponse {
  address: string | null;
  street: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  number?: string | null;
  postalCode?: string | null;
  neighborhood?: string | null;
}

export interface IReverseGeocodeParams {
  latitude: number;
  longitude: number;
}

export interface IGeocodingService {
  reverse(latLng: IReverseGeocodeParams): Promise<IReverseGeocodeResponse>;
}
