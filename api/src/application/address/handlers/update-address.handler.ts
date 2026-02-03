import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { AddressNotFoundException } from "../../../domain/address/exceptions/address-not-found.exception";
import { GeocodeAddressHandler } from "../../geolocation/handlers/geocode-address.handler";
import { UpdateAddressCommand } from "../commands/update-address.command";

@Injectable()
export class UpdateAddressHandler {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository,
    private readonly geocodeAddressHandler: GeocodeAddressHandler,
  ) {}

  async execute(cmd: UpdateAddressCommand): Promise<Address> {
    const existing = await this.addressRepository.findById(cmd.id);
    if (!existing) {
      throw new AddressNotFoundException(cmd.id);
    }

    const location = await resolveLocation(this.geocodeAddressHandler, cmd, existing);

    const address = Address.create({
      id: existing.id,
      userId: cmd.userId ?? existing.userId,
      street: cmd.street ?? existing.street,
      streetNumber: cmd.streetNumber ?? existing.streetNumber,
      neighborhood: cmd.neighborhood ?? existing.neighborhood,
      city: cmd.city ?? existing.city,
      province: cmd.province ?? existing.province,
      postalCode: cmd.postalCode ?? existing.postalCode,
      country: cmd.country ?? existing.country,
      location,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    });

    return this.addressRepository.update(address);
  }
}

async function resolveLocation(handler: GeocodeAddressHandler, cmd: UpdateAddressCommand, existing: Address) {
  const location = toLocation(cmd.latitude, cmd.longitude);
  if (location) {
    return location;
  }

  const result = await handler.execute({
    street: cmd.street ?? existing.street,
    city: cmd.city ?? existing.city,
    neighborhood: cmd.neighborhood ?? existing.neighborhood,
    state: cmd.province ?? existing.province,
    postalCode: cmd.postalCode ?? existing.postalCode,
    country: cmd.country ?? existing.country,
    number: cmd.streetNumber ?? existing.streetNumber,
  });

  if (!result) {
    return null;
  }

  return { latitude: result.location.latitude, longitude: result.location.longitude };
}

function toLocation(latitude: number | null | undefined, longitude: number | null | undefined) {
  if (!latitude || !longitude) {
    return null;
  }

  return { latitude, longitude };
}
