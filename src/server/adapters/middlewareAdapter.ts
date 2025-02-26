import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../application/interfaces/IMiddleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
      body: request.body,
      params: request.params,
      account: request?.metadata?.account,
    });
    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
      return;
    }
    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
