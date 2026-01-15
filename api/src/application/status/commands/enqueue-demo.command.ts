import { Inject, Injectable } from "@nestjs/common";
import type { DemoQueue } from "../../../domain/status/demo-queue";
import { DEMO_QUEUE } from "../status.tokens";

@Injectable()
export class EnqueueDemoCommand {
  constructor(@Inject(DEMO_QUEUE) private readonly demoQueue: DemoQueue) {}

  async execute(name?: string) {
    const resolvedName = name ?? "world";
    const job = await this.demoQueue.enqueueHello(resolvedName);

    return { enqueued: true, jobId: job.id, name: resolvedName };
  }
}
