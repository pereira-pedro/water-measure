import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserHandler } from "../../application/authentication/user/handlers/create-user.handler";
import { UpdateUserHandler } from "../../application/authentication/user/handlers/update-user.handler";
import { DeleteUserHandler } from "../../application/authentication/user/handlers/delete-user.handler";
import { GetUserByIdHandler } from "../../application/authentication/user/handlers/get-user-by-id.handler";
import { ListUsersHandler } from "../../application/authentication/user/handlers/list-users.handler";
import { CreateUserRequest } from "./dto/create-user.request";
import { UpdateUserRequest } from "./dto/update-user.request";

@Controller("users")
export class UserController {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly updateUserHandler: UpdateUserHandler,
    private readonly deleteUserHandler: DeleteUserHandler,
    private readonly getUserByIdHandler: GetUserByIdHandler,
    private readonly listUsersHandler: ListUsersHandler,
  ) {}

  @Post()
  async create(@Body() request: CreateUserRequest) {
    return this.createUserHandler.execute({
      fullName: request.fullName,
      email: request.email,
    });
  }

  @Get()
  async list() {
    return this.listUsersHandler.execute({});
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return this.getUserByIdHandler.execute({ id });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() request: UpdateUserRequest) {
    return this.updateUserHandler.execute({
      id,
      fullName: request.fullName,
    });
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.deleteUserHandler.execute({ id });
    return { ok: true };
  }
}
