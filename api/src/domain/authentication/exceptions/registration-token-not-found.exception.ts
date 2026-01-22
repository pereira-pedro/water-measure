import { NotFoundException } from "@nestjs/common";

export class RegistrationTokenNotFoundException extends NotFoundException {
  constructor(token: string) {
    super(`Registration token not found: ${token}`);
  }
}
