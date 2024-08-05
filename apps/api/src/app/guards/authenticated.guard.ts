import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  createParamDecorator,
} from '@nestjs/common';

import { verify_token } from '@marsinet/server';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const desiredHeaderName = 'Authorization';
    const headerValue: string =
      request.headers[desiredHeaderName.toLowerCase()];

    if (typeof headerValue !== 'string' || !headerValue.includes('Bearer')) {
      throw new ForbiddenException('No se proporcionó token de autenticación');
    }

    const token = headerValue.split(' ')[1];
    const user = await verify_token(token);

    if (!user) {
      // Token inválido o expirado
      throw new ForbiddenException('Token inválido o expirado');
    }

    request.user = user;
    return true;
  }
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
