import { NotAcceptableException } from "@nestjs/common";

export class NotAgreedToTermsException extends NotAcceptableException {
  constructor() {
    super("User not agreed to terms.");
  }
}
