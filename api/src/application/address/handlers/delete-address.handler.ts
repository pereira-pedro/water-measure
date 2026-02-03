import { Inject, Injectable } from "@nestjs/common";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../../domain/address/ports/address-repository";
import { DeleteAddressCommand } from "../commands/delete-address.command";
import { AddressDeletionNotAllowedException } from "../../../domain/address/exceptions/address-deletion-not-allowed.exception";

@Injectable()
export class DeleteAddressHandler {
  constructor(@Inject(ADDRESS_REPOSITORY) private readonly addressRepository: AddressRepository) {}

  async execute(cmd: DeleteAddressCommand): Promise<number> {
    const userAddressCount = await this.addressRepository.countByUserId(cmd.userId);
    if (userAddressCount <= 1) {
      throw new AddressDeletionNotAllowedException();
    }
    return await this.addressRepository.delete(cmd.id);
  }
}
