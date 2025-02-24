import Express from 'express';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';

const express = Express();

express.use(Express.json());

express.post('/sign-up', async (request, response) => {
  const sigUpController = makeSignUpController();
  const { body, statusCode } = await sigUpController.handle({ body: request.body });
  response.status(statusCode).json(body);
});

express.post('/sign-in', async (request, response) => {
  const signInController = makeSignInController();
  const { body, statusCode } = await signInController.handle({body: request.body});
  response.status(statusCode).json(body);
});

express.listen(3001, () => {
  console.log('> Server started at http://localhost:3001');
});
