require("dotenv").config();

var jwt = require("jsonwebtoken");
import "reflect-metadata";

import { ApolloServer } from "apollo-server-koa";

import { Container } from "typedi";
import * as TypeORM from "typeorm";
import * as TypeGraphQL from "type-graphql";

import { authChecker } from "./auth";

// Resolvers

import { UserResolver } from "./resolvers/user-resolver";

// Entities
import { User } from "./entities/user";
// import { Rate } from "./entities/rate";
// import { Recipe } from "./entities/recipe";

// Types
import { Context } from "./types/context";

// Subscribers
// import {UserSubscriber} from './subscribers/user'

import { PubSub } from "./pubSub";

const Koa = require("koa");
const Router = require("koa-router");

const { PORT = 4000 } = process.env;

// register 3rd party IOC container
TypeORM.useContainer(Container);

async function bootstrap() {
  const app = new Koa();

  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: "postgres",
      database: "table1",
      username: "postgres",
      password: "gweggweg",
      port: 5432,
      host: "test1.cprw2mvph38r.ap-southeast-2.rds.amazonaws.com",
      entities: [User],
      subscribers: [],
      synchronize: true,
      logger: "advanced-console",
      logging: "all",
      dropSchema: false,
      cache: true
    });

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [UserResolver],
      container: Container,
      authChecker,
      pubSub: PubSub
    });

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      introspection: true,
      playground: true,
      context: async ({ ctx, connection }) => {
        if (connection) {
          return connection.context;
        }

        const { authorization } = ctx.request.header;

        if (!authorization) {
          return {};
        }

        let token = authorization.replace("Bearer:", "").trim();

        try {
          let { user } = await jwt.verify(
            token,
            "rtn0UNX8qKlLgWJKxTW0vO5tvW94sljI27ISB30p22tET83If38JpCOqBgGP3g1QW"
          );
          const ctx: Context = { user };
          return ctx;
        } catch (err) {
          console.log(err);
          return {};
        }
      },

      subscriptions: {
        onDisconnect: (websocket, context) => {
          console.log("Got Subscription Disconnect");
        },
        onConnect: async (connectionParams: any, webSocket, context) => {
          console.log("Got Subscription Connect");
          console.log("connectionParams", connectionParams);

          const { authToken } = connectionParams;

          if (authToken) {
            try {
              let decoded = await jwt.verify(authToken, process.env.JWT_SECRET);
              console.log("decoded", decoded);
              return { user: decoded.user };
            } catch (err) {
              console.log("verify error", err);
              throw new Error("Missing auth token!");
            }
          }

          throw new Error("Missing auth token!");
        }
      }
    });

    const router = new Router();
    app.use(router.routes());

    router.get("/healthz", async (ctx, next) => {
      ctx.status = 200;
      return next();
    });

    const httpServer = app.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready at ${server.graphqlPath}`);
      console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
    });

    server.applyMiddleware({ app });
    server.installSubscriptionHandlers(httpServer);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
