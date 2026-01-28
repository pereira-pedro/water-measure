import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { UpdateAddressCommand } from "../commands/update-address.command";

@Injectable()
export class UpdateAddressHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: UpdateAddressCommand): Promise<Address> {
    const existing = await this.addressRepository.findById(cmd.id);
    if (!existing) {
      throw new Error(`Address not found: ${cmd.id}`);
    }

    const latitude = cmd.latitude ?? existing.location?.latitude ?? null;
    const longitude = cmd.longitude ?? existing.location?.longitude ?? null;
    const location = toLocation(latitude, longitude);

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

function toLocation(latitude: number | null, longitude: number | null) {
  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}
