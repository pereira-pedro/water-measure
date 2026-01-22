import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { UpdateUserCommand } from "../commands/update-user.command";

@Injectable()
export class UpdateUserHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(cmd: UpdateUserCommand): Promise<User> {
    const existing = await this.userRepository.findById(cmd.id);
    if (!existing) {
      throw new Error(`User not found: ${cmd.id}`);
    }

    const user = User.create({
      id: existing.id,
      fullName: cmd.fullName ?? existing.fullName,
      email: cmd.email ?? existing.email,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    });

    return this.userRepository.update(user);
  }
}
