import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StatusModule } from "./modules/status.module";
import { AuthenticationModule } from "./modules/authentication.module";
import { AddressModule } from "./modules/address.module";
import { UserModule } from "./modules/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'] // optional if you add a local .env
    }),
    StatusModule,
    AuthenticationModule,
    AddressModule,
    UserModule,
  ],
})
export class AppModule {}
