import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { CreateAddressCommand } from "../commands/create-address.command";

@Injectable()
export class CreateAddressHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: CreateAddressCommand): Promise<Address> {
    const location = toLocation(cmd.latitude ?? null, cmd.longitude ?? null);
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

    return this.addressRepository.create(address);
  }
}

function toLocation(latitude: number | null, longitude: number | null) {
  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}
