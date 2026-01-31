import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../../../../domain/authentication/ports/user-repository";
import { DeleteUserCommand } from "../commands/delete-user.command";

@Injectable()
export class DeleteUserHandler {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(cmd: DeleteUserCommand): Promise<void> {
    const existing = await this.userRepository.findById(cmd.id);
    if (!existing) {
      throw new Error(`User not found: ${cmd.id}`);
    }

    await this.userRepository.delete(cmd.id);
  }
}
