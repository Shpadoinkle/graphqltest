import {PostgresPubSub} from 'graphql-postgres-subscriptions'

export const PubSub = new PostgresPubSub({
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
})

PubSub.subscribe('error', err => {
  console.log('@@@ PubSub Error:', err)
})
