import Express from "express";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";
import { routeAdapter } from "./adapters/routeAdapter";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMIddleware";

const express = Express();

express.use(Express.json());

express.post("/sign-up", routeAdapter(makeSignUpController()));
express.post("/sign-in", routeAdapter(makeSignInController()));

express.get(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

express.listen(3001, () => {
  console.log("> Server started at http://localhost:3001");
});
