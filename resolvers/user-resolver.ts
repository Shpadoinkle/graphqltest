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
    @InjectRepository(User) private readonly userRepository: Repository<User> // @InjectRepository(Image) // private readonly imageRepository: Repository<Image>,
  ) // @InjectRepository(PrivateImage)
  // private readonly privateImageRepository: Repository<PrivateImage>
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
}
