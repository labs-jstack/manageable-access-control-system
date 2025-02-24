import { z, ZodError } from 'zod';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { IController, IRequest, IResponse } from '../interfaces/IController';
import { SignInUseCase } from '../useCases/SignInUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(request.body);
      const { accessToken } = await this.signInUseCase.execute({ email, password });
      return {
        body: { accessToken },
        statusCode: 200
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          body: error.issues,
          statusCode: 400
        };
      }
      if (error instanceof InvalidCredentials) {
        return {
          body: {
            error: error.message
          },
          statusCode: 401
        };
      }
      throw error;
    }
  }
}
