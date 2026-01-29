import type { GeocodeResult, GeocodeResponseData } from "@googlemaps/google-maps-services-js";
import { GeocodingGateway, GeocodeAddressInput, GeocodeAddressResult } from "../../../domain/geolocation/ports/geocoding-gateway";
import { GoogleMapsClient } from "./client";
import { GoogleMapsConfig } from "./config";

export class GoogleMapsGeocodingAdapter implements GeocodingGateway {
  constructor(
    private readonly client: GoogleMapsClient,
    private readonly config: GoogleMapsConfig,
  ) {}

  async geocodeAddress(input: GeocodeAddressInput): Promise<GeocodeAddressResult | null> {
    const address = buildAddress(input);
    if (!address) {
      return null;
    }

    const response = await this.client.geocode({
      params: {
        address,
        key: this.config.GOOGLE_MAPS_API_KEY,
        language: this.config.GOOGLE_MAPS_LANGUAGE,
        region: this.config.GOOGLE_MAPS_REGION,
      },
    });

    return toResult(response.data);
  }
}

function buildAddress(input: GeocodeAddressInput): string {
  const parts = [
    joinStreet(input.street, input.number),
    input.neighborhood ?? undefined,
    input.city,
    input.state ?? undefined,
    input.postalCode ?? undefined,
    input.country ?? undefined,
  ].filter(Boolean) as string[];

  return parts.join(", ").trim();
}

function joinStreet(street: string, number?: string | null): string {
  const trimmedStreet = street.trim();
  const trimmedNumber = number?.trim();
  if (trimmedNumber) {
    return `${trimmedStreet} ${trimmedNumber}`.trim();
  }

  return trimmedStreet;
}

function toResult(data: GeocodeResponseData): GeocodeAddressResult | null {
  if (!data || data.status === "ZERO_RESULTS" || data.results.length === 0) {
    return null;
  }

  if (data.status !== "OK") {
    throw new Error(`Google Maps geocoding failed: ${data.status}`);
  }

  const result = data.results[0];
  return mapResult(result);
}

function mapResult(result: GeocodeResult): GeocodeAddressResult {
  return {
    location: {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
    },
    formattedAddress: result.formatted_address ?? null,
    placeId: result.place_id ?? null,
  };
}
