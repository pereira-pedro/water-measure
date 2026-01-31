import { NotAcceptableException } from "@nestjs/common";

export class NotAgreedToTermsException extends NotAcceptableException {
  constructor(token: string) {
    super(`User not agreed to terms. Token: ${token}`);
  }
}
