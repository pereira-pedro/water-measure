import { Injectable } from "@nestjs/common";

@Injectable()
export class GetHealthQuery {
  execute() {
    return { ok: true };
  }
}
