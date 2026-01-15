import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import type { Queue } from "bullmq";
import type { DemoQueue } from "../../domain/status/demo-queue";

@Injectable()
export class BullmqDemoQueue implements DemoQueue {
  constructor(@InjectQueue("demo") private readonly demoQueue: Queue) {}

  async enqueueHello(name: string) {
    const job = await this.demoQueue.add(
      "say-hello",
      { name },
      { attempts: 3, backoff: { type: "exponential", delay: 1000 } }
    );

    return { id: job.id ?? null };
  }
}
