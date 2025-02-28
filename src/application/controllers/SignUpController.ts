import { z, ZodError } from 'zod';
import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { IController, IResponse } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { SignUpUseCase } from '../useCases/SignUpUseCase';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  roleId: z.string().uuid()
});

export class SigUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { email, name, password, roleId } = schema.parse(request.body);
      await this.signUpUseCase.execute({email, name, password, roleId});
      return {
        body: null,
        statusCode: 204
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues
        };
      }
      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: {
            error: error.message
          }
        };
      }
      throw error;
    }
  }

}
