import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { StatusModule } from "./modules/status.module";
import { AuthenticationModule } from './modules/authentication.module';
import { AuthenticationController } from './presentation/authentication/authentication.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'] // optional if you add a local .env
    }),
    StatusModule,
    AuthenticationModule,
  ],
  controllers: [AuthenticationController],
})
export class AppModule {}
