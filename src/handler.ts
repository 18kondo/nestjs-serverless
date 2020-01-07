import { Context } from "aws-lambda";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Server } from "http";
import { ExpressAdapter } from "@nestjs/platform-express";
import { createServer, proxy } from "aws-serverless-express";
import * as express from "express";

let cachedServer: Server;

const bootstrapServer = (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  return NestFactory.create(AppModule, adapter)
    .then(app => app.enableCors())
    .then(app => app.init())
    .then(() => createServer(expressApp));
};

export const handler = (event: any, context: Context) => {
  if (!cachedServer) {
    bootstrapServer().then(server => {
      cachedServer = server;
      return proxy(server, event, context);
    });
  } else {
    return proxy(cachedServer, event, context);
  }
};
