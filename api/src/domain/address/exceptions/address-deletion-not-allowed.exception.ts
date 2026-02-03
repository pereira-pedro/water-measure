import { NotAcceptableException } from "@nestjs/common";

export class AddressDeletionNotAllowedException extends NotAcceptableException {
  constructor() {
    super("Cannot delete the last address for this user.");
  }
}
