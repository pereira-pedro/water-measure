import { Inject, Injectable } from "@nestjs/common";
import { Address } from "../../../domain/address/models/address";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { GetAddressByIdCommand } from "../commands/get-address-by-id.command";

@Injectable()
export class GetAddressByIdHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: GetAddressByIdCommand): Promise<Address | null> {
    return this.addressRepository.findById(cmd.id);
  }
}
