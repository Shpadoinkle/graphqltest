import { InputType, Field } from "type-graphql";
import { User } from "../entities/user";
// import {Upload} from '../types/upload'
// import { GraphQLUpload } from "graphql-upload";

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  password: string;

  //   @Field({nullable: true})
  //   accessToken: string

  //   @Field({nullable: true})
  //   identityToken: string

  //   @Field({nullable: true})
  //   appleId: string

  //   @Field({nullable: true})
  //   identityType: string

  //   @Field(type => [GraphQLUpload], {nullable: true})
  //   identityImage: Upload[]
}
