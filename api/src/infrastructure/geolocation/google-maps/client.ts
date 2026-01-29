import { Client } from "@googlemaps/google-maps-services-js";

export type GoogleMapsClient = Client;

export function createGoogleMapsClient(): GoogleMapsClient {
  return new Client({});
}
