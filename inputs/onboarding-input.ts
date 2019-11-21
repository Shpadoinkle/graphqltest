import { Field, InputType } from "type-graphql";
// import { HouseholdInput } from "./household-input";
import { UserInput } from "./user-input";

@InputType()
export class OnboardingInput {
  @Field({ nullable: false })
  user: UserInput;

  //   @Field({ nullable: true })
  //   householdId: String;

  //   @Field({ nullable: true })
  //   household: HouseholdInput;
}
