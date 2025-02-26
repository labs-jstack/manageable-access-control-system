import { IData, IMiddleware, IResponse } from '../interfaces/IMiddleware';
import { IRequest } from '../interfaces/IRequest';

export class AuthorizationMiddleware implements IMiddleware{
  constructor(private readonly allowedRole: string[]) {}

  async handle(request: IRequest): Promise<IData | IResponse> {
    if(!request.account) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.'
        }
      };
    }
    if(!this.allowedRole.includes(request.account.role)) {
      return {
        statusCode: 403,
        body: {
          error: 'Access Denied.'
        }
      };
    }
    return {
      data: {}
    };
  }
}
