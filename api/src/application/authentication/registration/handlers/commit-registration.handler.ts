import { Inject, Injectable } from "@nestjs/common";
import { CreateUserHandler } from "../../user/handlers/create-user.handler";
import { CommitRegistrationCommand } from "../commands/commit-registration.command";
import { FetchRegistrationHandler } from "./fetch-registration.handler";
import { CreateAddressHandler } from "src/application/address/handlers/create-address.handler";
import { RegistrationData } from "src/domain/authentication/valueobject/registration-data";
import { TRANSACTION_MANAGER, TransactionManager } from "src/domain/transaction/ports/transaction-manager";
import { NotAgreedToTermsException } from "src/domain/authentication/exceptions/not-agreed-to-terms.exception";

@Injectable()
export class CommitRegistrationHandler {
  constructor(
    @Inject(TRANSACTION_MANAGER) private readonly transactionManager: TransactionManager,
    private readonly fetchRegistrationHandler: FetchRegistrationHandler,
    private readonly createUserHandler: CreateUserHandler,
    private readonly createAddressHandler: CreateAddressHandler,
  ) {}

  async execute(cmd: CommitRegistrationCommand): Promise<RegistrationData> {
    const registrationData = await this.fetchRegistrationHandler.execute({ token: cmd.token });

    if (!registrationData.agreedToTerms) {
      throw new NotAgreedToTermsException(cmd.token);
    }

    return this.transactionManager.run(async (tx) => {
      const user = await this.createUserHandler.execute(registrationData.user!, tx);
      let address;

      if (registrationData.address && user.id) {
        registrationData.address.userId = user.id;
        address = await this.createAddressHandler.execute(registrationData.address, tx);
      }

      registrationData.user = user;
      registrationData.address = address;

      return registrationData;
    });
  }
}
