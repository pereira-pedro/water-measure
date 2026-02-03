import { NotFoundException } from "@nestjs/common";

export class AddressNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Address not found: ${id}`);
  }
}
