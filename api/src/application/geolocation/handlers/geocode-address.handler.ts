import { Inject, Injectable } from "@nestjs/common";
import {
  GEOCODING_GATEWAY,
  GeocodingGateway,
  GeocodeAddressResult,
} from "../../../domain/geolocation/ports/geocoding-gateway";
import { GeocodeAddressCommand } from "../commands/geocode-address.command";

@Injectable()
export class GeocodeAddressHandler {
  constructor(@Inject(GEOCODING_GATEWAY) private readonly gateway: GeocodingGateway) {}

  async execute(cmd: GeocodeAddressCommand): Promise<GeocodeAddressResult | null> {
    return this.gateway.geocodeAddress({
      street: cmd.street,
      city: cmd.city,
      neighborhood: cmd.neighborhood ?? null,
      state: cmd.state ?? null,
      postalCode: cmd.postalCode ?? null,
      country: cmd.country ?? null,
      number: cmd.number ?? null,
    });
  }
}
