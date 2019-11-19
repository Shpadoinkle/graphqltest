"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_postgres_subscriptions_1 = require("graphql-postgres-subscriptions");
exports.PubSub = new graphql_postgres_subscriptions_1.PostgresPubSub({
    user: "postgres",
    host: "test1.cprw2mvph38r.ap-southeast-2.rds.amazonaws.com",
    database: "table1",
    password: "gweggweg",
    port: 5432
});
exports.PubSub.subscribe("error", err => {
    console.log("@@@@ PubSub Error:", err);
});
