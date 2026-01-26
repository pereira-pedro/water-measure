import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { VerifyTokenHandler } from "../../../application/authentication/token/handlers/verify-token.handler";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly verifyTokenHandler: VerifyTokenHandler,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request?.headers?.authorization ?? "";

    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid Authorization header");
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (!token) {
      throw new UnauthorizedException("Missing token");
    }

    const result = await this.verifyTokenHandler.execute({ token });
    if (!result.isValid || !result.token) {
      throw new UnauthorizedException("Invalid token");
    }

    request.authToken = result.token;
    return true;
  }
}
