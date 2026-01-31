import { Module } from "@nestjs/common";
import { UserController } from "../presentation/user/user.controller";
import { CreateUserHandler } from "../application/authentication/user/handlers/create-user.handler";
import { UpdateUserHandler } from "../application/authentication/user/handlers/update-user.handler";
import { DeleteUserHandler } from "../application/authentication/user/handlers/delete-user.handler";
import { GetUserByIdHandler } from "../application/authentication/user/handlers/get-user-by-id.handler";
import { ListUsersHandler } from "../application/authentication/user/handlers/list-users.handler";
import { USER_REPOSITORY } from "../domain/authentication/ports/user-repository";
import { PrismaUserRepository } from "../infrastructure/authentication/user/prisma-user.repository";

@Module({
  controllers: [UserController],
  providers: [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    GetUserByIdHandler,
    ListUsersHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
