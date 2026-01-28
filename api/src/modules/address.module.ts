import { Module } from "@nestjs/common";
import { AddressController } from "../presentation/address/address.controller";
import { CreateAddressHandler } from "../application/address/handlers/create-address.handler";
import { UpdateAddressHandler } from "../application/address/handlers/update-address.handler";
import { DeleteAddressHandler } from "../application/address/handlers/delete-address.handler";
import { GetAddressByIdHandler } from "../application/address/handlers/get-address-by-id.handler";
import { ListAddressesHandler } from "../application/address/handlers/list-addresses.handler";
import { ADDRESS_REPOSITORY } from "../domain/address/ports/address-repository";
import { PrismaAddressRepository } from "../infrastructure/address/prisma-address.repository";

@Module({
  controllers: [AddressController],
  providers: [
    CreateAddressHandler,
    UpdateAddressHandler,
    DeleteAddressHandler,
    GetAddressByIdHandler,
    ListAddressesHandler,
    {
      provide: ADDRESS_REPOSITORY,
      useClass: PrismaAddressRepository,
    },
  ],
})
export class AddressModule {}
