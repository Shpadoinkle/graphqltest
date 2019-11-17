import { getRepository, createQueryBuilder, getConnection } from "typeorm";
// const request = require("request");
import { get } from "request";
import { FacebookUser } from "./types/facebook-user";
import { AppleUser } from "./types/apple-user";
import { User } from "./entities/user";
// import {Household} from './entities/household'
// import {Conversation, ConversationStatus} from './entities/conversation'
// import appleSignIn from 'apple-signin'

export type Lazy<T extends object> = Promise<T> | T;

/**
 * Generate a conversation between two households
 * @param households
 */
// export async function generateConversation(
//   households: Household[],
//   initiatorId?: number,
//   status?: ConversationStatus
// ): Promise<Conversation> {
//   // Check convo exists
//   const exists: Number = await conversationExists(households)
//   if (exists) {
//     return await getRepository(Conversation).findOne(Number(exists))
//   }

//   // Create conversation
//   let conversation = new Conversation()
//   conversation.initiatorId = initiatorId
//   conversation.households = households

//   if (status) {
//     conversation.status = status
//   }

//   console.log('@@@ conversation', conversation)
//   const convo = await getRepository(Conversation).save(conversation)

//   await addConversationToHouseholds(
//     [households[0], households[1]],
//     conversation
//   )

//   return convo
// }

/**
 * Check if conversation exists
 * @param households
 */
// export async function conversationExists(
//   households: Household[]
// ): Promise<Number> {
//   const oneToTwo = await createQueryBuilder(Household, 'household')
//     .leftJoinAndSelect('household.conversations', 'conversation')
//     .leftJoinAndSelect('conversation.households', 'h')
//     .where('household.id = :myHouseholdId', {myHouseholdId: households[0].id})
//     .andWhere('h.id = :householdId', {householdId: households[1].id})
//     .getOne()

//   // console.log('@@@ oneToTwo', oneToTwo)

//   const twoToOne = await createQueryBuilder(Household, 'household')
//     .leftJoinAndSelect('household.conversations', 'conversation')
//     .leftJoinAndSelect('conversation.households', 'h')
//     .where('household.id = :myHouseholdId', {myHouseholdId: households[1].id})
//     .andWhere('h.id = :householdId', {householdId: households[0].id})
//     .getOne()

//   // console.log('@@@ twoToOne', twoToOne)

//   if (!twoToOne || !oneToTwo) {
//     return null
//   }

//   let conversation = (await oneToTwo.conversations)[0]

//   if (!conversation) {
//     // TODO
//   }

//   return conversation.id
// }

/**
 * Add a conversation to both households relations
 * @param households
 * @param conversation
 */
// export async function addConversationToHouseholds(
//   households: Household[],
//   conversation: Conversation
// ) {
//   // Add to my conversations
//   await getConnection()
//     .createQueryBuilder()
//     .relation(Household, 'conversations')
//     .of(Number(households[0].id))
//     .add(conversation)

//   // Add to their conversations
//   await getConnection()
//     .createQueryBuilder()
//     .relation(Household, 'conversations')
//     .of(Number(households[1].id))
//     .add(conversation)
// }

// export function verifyFacebookLogin(token): Promise<void> {
//   return new Promise((resolve, reject) => {
//     let url = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
//     get(
//       {
//         url,
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//       (err, res, body) => {
//         console.log(body)
//         body = JSON.parse(body)

//         //check for general error
//         if (err) {
//           return reject(err)
//         }

//         if (!body.data) {
//           return reject(new Error('No data result returned!'))
//         }

//         if (
//           body.data.application !== process.env.FACEBOOK_APP_NAME ||
//           body.data.app_id !== process.env.FACEBOOK_APP_ID
//         ) {
//           return reject(new Error('Token is for wrong application!'))
//         }

//         //Everything verified, Get User data
//         return resolve(token)
//       }
//     )
//   })
// }

// export function getFacebookUser(token): Promise<FacebookUser> {
//   var fields = 'id,first_name,last_name,birthday,email,gender,picture'
//   return new Promise((resolve, reject) => {
//     get(
//       {
//         url: `https://graph.facebook.com/me?fields=${fields}&access_token=${token}`,
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//       (err, res, body) => {
//         if (err) {
//           return reject(err)
//         }

//         if (!body) {
//           return reject(new Error('No User data was able to be fetched!'))
//         }

//         body = JSON.parse(body)

//         //return the user data
//         return resolve(body)
//       }
//     )
//   })
// }

// export function getAppleUser(identityToken, user): Promise<AppleUser> {
//   return new Promise(async (resolve, reject) => {
//     const res = await appleSignIn.verifyIdToken(
//       identityToken,
//       process.env.APPLE_CLIENT_ID // APPLE_CLIENT_ID
//     )

//     const appleId = res.sub
//     const clientId = res.aud
//     // check if user matches user
//     if (appleId !== user) {
//       return reject(new Error('Bad user id'))
//     }
//     // check if aud matche clientID
//     if (clientId !== process.env.APPLE_CLIENT_ID) {
//       return reject(new Error('Bad aud'))
//     }

//     return resolve(res)
//   })
// }
