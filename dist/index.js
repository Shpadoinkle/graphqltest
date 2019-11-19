"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var jwt = require("jsonwebtoken");
require("reflect-metadata");
const apollo_server_koa_1 = require("apollo-server-koa");
const typedi_1 = require("typedi");
const TypeORM = __importStar(require("typeorm"));
const TypeGraphQL = __importStar(require("type-graphql"));
const auth_1 = require("./auth");
// Resolvers
const user_resolver_1 = require("./resolvers/user-resolver");
// Entities
const user_1 = require("./entities/user");
// Subscribers
// import {UserSubscriber} from './subscribers/user'
const pubSub_1 = require("./pubSub");
const Koa = require("koa");
const Router = require("koa-router");
const { PORT = 4000 } = process.env;
// register 3rd party IOC container
TypeORM.useContainer(typedi_1.Container);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new Koa();
        try {
            // create TypeORM connection
            yield TypeORM.createConnection({
                type: "postgres",
                database: "table1",
                username: "postgres",
                password: "gweggweg",
                port: 5432,
                host: "test1.cprw2mvph38r.ap-southeast-2.rds.amazonaws.com",
                entities: [user_1.User],
                subscribers: [],
                synchronize: true,
                logger: "advanced-console",
                logging: "all",
                dropSchema: false,
                cache: true
            });
            // build TypeGraphQL executable schema
            const schema = yield TypeGraphQL.buildSchema({
                resolvers: [user_resolver_1.UserResolver],
                container: typedi_1.Container,
                authChecker: auth_1.authChecker,
                pubSub: pubSub_1.PubSub
            });
            // Create GraphQL server
            const server = new apollo_server_koa_1.ApolloServer({
                schema,
                introspection: true,
                playground: true,
                context: ({ ctx, connection }) => __awaiter(this, void 0, void 0, function* () {
                    if (connection) {
                        return connection.context;
                    }
                    const { authorization } = ctx.request.header;
                    if (!authorization) {
                        return {};
                    }
                    let token = authorization.replace("Bearer:", "").trim();
                    try {
                        let { user } = yield jwt.verify(token, "rtn0UNX8qKlLgWJKxTW0vO5tvW94sljI27ISB30p22tET83If38JpCOqBgGP3g1QW");
                        const ctx = { user };
                        return ctx;
                    }
                    catch (err) {
                        console.log(err);
                        return {};
                    }
                }),
                subscriptions: {
                    onDisconnect: (websocket, context) => {
                        console.log("Got Subscription Disconnect");
                    },
                    onConnect: (connectionParams, webSocket, context) => __awaiter(this, void 0, void 0, function* () {
                        console.log("Got Subscription Connect");
                        console.log("connectionParams", connectionParams);
                        const { authToken } = connectionParams;
                        if (authToken) {
                            try {
                                let decoded = yield jwt.verify(authToken, process.env.JWT_SECRET);
                                console.log("decoded", decoded);
                                return { user: decoded.user };
                            }
                            catch (err) {
                                console.log("verify error", err);
                                throw new Error("Missing auth token!");
                            }
                        }
                        throw new Error("Missing auth token!");
                    })
                }
            });
            //Test elastic
            const router = new Router();
            app.use(router.routes());
            router.get("/healthz", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                ctx.status = 200;
                return next();
            }));
            const httpServer = app.listen({ port: PORT }, () => {
                console.log(`🚀 Server ready at ${server.graphqlPath}`);
                console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
            });
            server.applyMiddleware({ app });
            server.installSubscriptionHandlers(httpServer);
        }
        catch (err) {
            console.error(err);
        }
    });
}
bootstrap();
