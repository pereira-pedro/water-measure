import { GeoPoint } from "../models/geo-point";

export type GeocodeAddressInput = {
  street: string;
  neighborhood?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  number?: string | null;
};

export type GeocodeAddressResult = {
  location: GeoPoint;
  formattedAddress: string | null;
  placeId: string | null;
};

export interface GeocodingGateway {
  geocodeAddress(input: GeocodeAddressInput): Promise<GeocodeAddressResult | null>;
}

export const GEOCODING_GATEWAY = Symbol("GEOCODING_GATEWAY");
