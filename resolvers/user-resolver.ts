import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { Brackets, Repository, Not } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User } from "../entities/user";
import { Context } from "../types/context";

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User> // @InjectRepository(Image) // private readonly imageRepository: Repository<Image>, // @InjectRepository(PrivateImage)
  ) // private readonly privateImageRepository: Repository<PrivateImage>
  {}

  /**
   * Queries/Mutations
   */

  @Authorized()
  @Query(returns => User, { nullable: true })
  me(@Ctx() ctx: Context) {
    if (!ctx.user) {
      return null;
    }
    return this.userRepository.findOne(ctx.user.id);
  }

  @Mutation(returns => String, { nullable: false })
  async login(@Arg("email") email: String, @Arg("password") password: String) {
    const user = await this.userRepository.findOne({
      where: {
        email: email.trim().toLowerCase()
      }
    });

    console.log("user", user);

    if (!user) {
      throw new Error("No account found with those details");
    }

    // if (!user.emailConfirmed) {
    //   throw new Error('Please confirm your account before logging in')
    // }

    if (!user.password) {
      throw new Error("Please login using facebook");
    }

    const match = await compare(password, user.password);

    if (match === true) {
      const token = sign({ user }, process.env.JWT_SECRET, {
        noTimestamp: true
      });
      return token;
    } else {
      throw new Error("Those login details are incorrect");
    }
  }
}
