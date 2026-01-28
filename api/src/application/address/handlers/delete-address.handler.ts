import { Inject, Injectable } from "@nestjs/common";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { DeleteAddressCommand } from "../commands/delete-address.command";

@Injectable()
export class DeleteAddressHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: DeleteAddressCommand): Promise<void> {
    await this.addressRepository.delete(cmd.id);
  }
}
