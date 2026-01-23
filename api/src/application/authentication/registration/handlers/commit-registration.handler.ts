import { Injectable } from "@nestjs/common";
import { User } from "../../../../domain/authentication/models/user";
import { UpdateRegistrationCommand } from "../commands/update-registration.command";
import { UpdateRegistrationHandler } from "./update-registration.handler";
import { CreateUserHandler } from "../../user/handlers/create-user.handler";

@Injectable()
export class CommitRegistrationHandler {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly updateRegistrationHandler: UpdateRegistrationHandler
  ) {}

  async execute(cmd: UpdateRegistrationCommand): Promise<User> {
    const user = await this.updateRegistrationHandler.execute(cmd);
    await this.createUserHandler.execute(user);
    return user;
  }
}
