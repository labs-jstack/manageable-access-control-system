import { IController, IResponse } from '../interfaces/IController';

export class ListLeadsController implements IController {
  async handle(): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        leads: [
          { id: '1', name: 'Joao' },
          { id: '12', name: 'Mateus' },
        ],
      },
    };
  }
}
