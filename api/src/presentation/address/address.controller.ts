import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common";
import { CreateAddressHandler } from "../../application/address/handlers/create-address.handler";
import { UpdateAddressHandler } from "../../application/address/handlers/update-address.handler";
import { DeleteAddressHandler } from "../../application/address/handlers/delete-address.handler";
import { GetAddressByIdHandler } from "../../application/address/handlers/get-address-by-id.handler";
import { ListAddressesHandler } from "../../application/address/handlers/list-addresses.handler";
import { CreateAddressRequest } from "./requests/create-address.request";
import { UpdateAddressRequest } from "./requests/update-address.request";

@Controller("addresses")
export class AddressController {
  constructor(
    private readonly createAddressHandler: CreateAddressHandler,
    private readonly updateAddressHandler: UpdateAddressHandler,
    private readonly deleteAddressHandler: DeleteAddressHandler,
    private readonly getAddressByIdHandler: GetAddressByIdHandler,
    private readonly listAddressesHandler: ListAddressesHandler,
  ) {}

  @Post()
  async create(@Body() request: CreateAddressRequest, @Req() req: any) {
    const userId = req?.authToken?.userId;
    if (!userId) {
      throw new UnauthorizedException("Missing auth token");
    }

    return this.createAddressHandler.execute({
      userId,
      street: request.street,
      streetNumber: request.streetNumber,
      neighborhood: request.neighborhood ?? null,
      city: request.city,
      province: request.province,
      postalCode: request.postalCode,
      country: request.country,
      latitude: request.latitude ?? null,
      longitude: request.longitude ?? null,
    });
  }

  @Get()
  async list(@Req() req: any) {
    const userId = req?.authToken?.userId;
    if (!userId) {
      throw new UnauthorizedException("Missing auth token");
    }

    return this.listAddressesHandler.execute({
      userId,
    });
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.getAddressByIdHandler.execute({ id });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() request: UpdateAddressRequest, @Req() req: any) {
    const userId = req?.authToken?.userId;
    if (!userId) {
      throw new UnauthorizedException("Missing auth token");
    }

    return this.updateAddressHandler.execute({
      id,
      userId,
      street: request.street,
      streetNumber: request.streetNumber,
      neighborhood: request.neighborhood ?? null,
      city: request.city,
      province: request.province,
      postalCode: request.postalCode,
      country: request.country,
      latitude: request.latitude ?? null,
      longitude: request.longitude ?? null,
    });
  }

  @Delete(":id")
  async delete(@Param("id") id: string, @Req() req: any) {
    const userId = req?.authToken?.userId;
    if (!userId) {
      throw new UnauthorizedException("Missing auth token");
    }

    const deletedCount = await this.deleteAddressHandler.execute({ id, userId });
    return { deleted: deletedCount };
  }
}
