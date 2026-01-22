import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { CreateUserCommand } from "../commands/create-user.command";

@Injectable()
export class CreateUserHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(cmd: CreateUserCommand): Promise<User> {
    const user = User.create({
      fullName: cmd.fullName,
      email: cmd.email,
    });

    return this.userRepository.create(user);
  }
}
