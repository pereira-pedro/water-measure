import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { GeocodeAddressHandler } from "../../geolocation/handlers/geocode-address.handler";
import { CreateAddressCommand } from "../commands/create-address.command";

@Injectable()
export class CreateAddressHandler {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository,
    private readonly geocodeAddressHandler: GeocodeAddressHandler,
  ) {}

  async execute(cmd: CreateAddressCommand, tx?: unknown): Promise<Address> {
    const location = await resolveLocation(this.geocodeAddressHandler, cmd);
    const address = Address.create({
      userId: cmd.userId,
      street: cmd.street,
      streetNumber: cmd.streetNumber,
      neighborhood: cmd.neighborhood,
      city: cmd.city,
      province: cmd.province,
      postalCode: cmd.postalCode,
      country: cmd.country,
      location,
    });

    return this.addressRepository.create(address, tx);
  }
}

async function resolveLocation(handler: GeocodeAddressHandler, cmd: CreateAddressCommand) {
  const location = toLocation(cmd.latitude ?? null, cmd.longitude ?? null);
  if (location) {
    return location;
  }

  const result = await handler.execute({
    street: cmd.street,
    city: cmd.city,
    neighborhood: cmd.neighborhood ?? null,
    state: cmd.province,
    postalCode: cmd.postalCode,
    country: cmd.country,
    number: cmd.streetNumber,
  });

  if (!result) {
    return null;
  }

  return { latitude: result.location.latitude, longitude: result.location.longitude };
}

function toLocation(latitude: number | null, longitude: number | null) {
  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}
