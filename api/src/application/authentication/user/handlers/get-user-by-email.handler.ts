import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { GetUserByEmailCommand } from "../commands/get-user-by-email.command";

@Injectable()
export class GetUserByEmailHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(cmd: GetUserByEmailCommand): Promise<User | null> {
    return this.userRepository.findByEmail(cmd.email);
  }
}
