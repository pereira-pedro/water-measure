import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StatusModule } from "./modules/status.module";
import { AuthenticationModule } from "./modules/authentication.module";
import { AddressModule } from "./modules/address.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'] // optional if you add a local .env
    }),
    StatusModule,
    AuthenticationModule,
    AddressModule,
  ],
})
export class AppModule {}
