import { NotFoundException } from "@nestjs/common";

export class EmailNotFoundException extends NotFoundException {
  constructor() {
    super("Not found.");
  }
}
