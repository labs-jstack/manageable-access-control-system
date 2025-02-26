import { Request, Response } from 'express';
import { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { body, statusCode } = await controller.handle({
      headers: request.headers as Record<string, string>,
      body: request.body,
      params: request.params,
      account: request?.metadata?.account,
    });
    response.status(statusCode).json(body);
  };
}

