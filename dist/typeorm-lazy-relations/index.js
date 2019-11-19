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
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const typedi_1 = require("typedi");
const TypeORM = __importStar(require("typeorm"));
const TypeGraphQL = __importStar(require("type-graphql"));
const recipe_resolver_1 = require("./resolvers/recipe-resolver");
const recipe_1 = require("./entities/recipe");
const rate_1 = require("./entities/rate");
const user_1 = require("./entities/user");
const helpers_1 = require("./helpers");
// register 3rd party IOC container
TypeORM.useContainer(typedi_1.Container);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // create TypeORM connection
            yield TypeORM.createConnection({
                type: "mysql",
                database: process.env.DATABASE_NAME,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                port: 5432,
                host: process.env.DATABASE_HOST,
                entities: [recipe_1.Recipe, rate_1.Rate, user_1.User],
                synchronize: true,
                logger: "advanced-console",
                logging: "all",
                dropSchema: true,
                cache: true
            });
            // seed database with some data
            const { defaultUser } = yield helpers_1.seedDatabase();
            // build TypeGraphQL executable schema
            const schema = yield TypeGraphQL.buildSchema({
                resolvers: [recipe_resolver_1.RecipeResolver],
                container: typedi_1.Container
            });
            // create mocked context
            const context = { user: defaultUser };
            // Create GraphQL server
            const server = new apollo_server_1.ApolloServer({ schema, context });
            // Start the server
            const { url } = yield server.listen(4000);
            console.log(`Server is running, GraphQL Playground available at ${url}`);
        }
        catch (err) {
            console.error(err);
        }
    });
}
bootstrap();
