import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigService } from "@nestjs/config";
import { DemoProcessor } from "./demo.processor";

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>("REDIS_HOST", "redis"),
          port: Number(config.get<string>("REDIS_PORT", "6379")),
        },
      }),
    }),
    BullModule.registerQueue({
      name: "demo",
    }),
  ],
  providers: [DemoProcessor],
  exports: [BullModule],
})
export class JobsModule {}
