import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { GetUserByIdCommand } from "../commands/get-user-by-id.command";

@Injectable()
export class GetUserByIdHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(cmd: GetUserByIdCommand): Promise<User | null> {
    return this.userRepository.findById(cmd.id);
  }
}
