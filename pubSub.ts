import { PostgresPubSub } from "graphql-postgres-subscriptions";

export const PubSub = new PostgresPubSub({
  user: "postgres",
  host: "test1.cprw2mvph38r.ap-southeast-2.rds.amazonaws.com",
  database: "table1",
  password: "gweggweg",
  port: 5432
});

PubSub.subscribe("error", err => {
  console.log("@@@ PubSub Error:", err);
});
