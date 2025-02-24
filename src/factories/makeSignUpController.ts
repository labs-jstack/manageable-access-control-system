import { SigUpController } from '../application/controllers/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SigUpController(signUpUseCase);
}
