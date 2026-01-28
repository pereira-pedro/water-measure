import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { ListAddressesCommand } from "../commands/list-addresses.command";

@Injectable()
export class ListAddressesHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: ListAddressesCommand = {}): Promise<Address[]> {
    return this.addressRepository.findAll({ userId: cmd.userId ?? null });
  }
}
