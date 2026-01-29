import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { GEOCODING_GATEWAY } from "../domain/geolocation/ports/geocoding-gateway";
import { GoogleMapsGeocodingAdapter } from "../infrastructure/geolocation/google-maps/adapter";
import { createGoogleMapsClient, type GoogleMapsClient } from "../infrastructure/geolocation/google-maps/client";
import { loadGoogleMapsConfig, type GoogleMapsConfig } from "../infrastructure/geolocation/google-maps/config";
import { GOOGLE_MAPS_CLIENT, GOOGLE_MAPS_CONFIG } from "../infrastructure/geolocation/google-maps/tokens";
import { GeocodeAddressHandler } from "../application/geolocation/handlers/geocode-address.handler";

@Module({
  imports: [ConfigModule],
  providers: [
    GeocodeAddressHandler,
    {
      provide: GOOGLE_MAPS_CONFIG,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): GoogleMapsConfig => {
        return loadGoogleMapsConfig({
          GOOGLE_MAPS_API_KEY: cfg.get<string>("GOOGLE_MAPS_API_KEY"),
          GOOGLE_MAPS_LANGUAGE: cfg.get<string>("GOOGLE_MAPS_LANGUAGE"),
          GOOGLE_MAPS_REGION: cfg.get<string>("GOOGLE_MAPS_REGION"),
        } as NodeJS.ProcessEnv);
      },
    },
    {
      provide: GOOGLE_MAPS_CLIENT,
      useFactory: (): GoogleMapsClient => createGoogleMapsClient(),
    },
    {
      provide: GEOCODING_GATEWAY,
      inject: [GOOGLE_MAPS_CLIENT, GOOGLE_MAPS_CONFIG],
      useFactory: (client: GoogleMapsClient, config: GoogleMapsConfig) => {
        return new GoogleMapsGeocodingAdapter(client, config);
      },
    },
  ],
  exports: [GEOCODING_GATEWAY, GeocodeAddressHandler],
})
export class GeolocationModule {}
