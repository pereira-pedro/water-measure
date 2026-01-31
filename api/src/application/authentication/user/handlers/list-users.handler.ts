import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { ListUsersCommand } from "../commands/list-users.command";

@Injectable()
export class ListUsersHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(_cmd: ListUsersCommand = {}): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
