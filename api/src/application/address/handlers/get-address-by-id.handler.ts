import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { AddressNotFoundException } from "../../../domain/address/exceptions/address-not-found.exception";
import { GetAddressByIdCommand } from "../commands/get-address-by-id.command";

@Injectable()
export class GetAddressByIdHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: GetAddressByIdCommand): Promise<Address> {
    const address = await this.addressRepository.findById(cmd.id);
    if (!address) {
      throw new AddressNotFoundException(cmd.id);
    }

    return address;
  }
}
