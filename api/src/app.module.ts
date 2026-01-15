import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StatusModule } from "./modules/status.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'] // optional if you add a local .env
    }),
    StatusModule,
  ],
})
export class AppModule {}
