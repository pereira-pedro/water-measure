import { Processor, WorkerHost } from "@nestjs/bullmq";
import type { Job } from "bullmq";

@Processor("demo")
export class DemoProcessor extends WorkerHost {
  async process(job: Job<{ name: string }>) {
    const name = job.data?.name ?? "world";

    // This log should appear in `docker compose logs -f api`
    // eslint-disable-next-line no-console
    console.log(`[demo] Processing job ${job.id} (${job.name}): hello, ${name}!`);

    return { greeted: name, at: new Date().toISOString() };
  }
}
