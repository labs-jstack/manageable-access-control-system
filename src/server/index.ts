import express from 'express';
import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMIddleware';
import { makeAuthorizationMiddleware } from '../factories/makeAuthorizationMiddleware';
import { makeListLeadsController } from '../factories/makeListLeadsController';
import { makeSignInController } from '../factories/makeSignInController';
import { makeSignUpController } from '../factories/makeSignUpController';
import { middlewareAdapter } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapter';

const app = express();

app.use(express.json());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.post(
  '/leads',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['ADMIN'])),
  (request, response) => {
    response.json({ created: true });
  }
);

app.listen(3001, () => {
  console.log('> Server started at http://localhost:3001');
});
