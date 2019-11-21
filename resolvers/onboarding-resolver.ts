import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/user";
import { OnboardingInput } from "../inputs/onboarding-input";

@Resolver()
export class OnboardingResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(returns => String)
  async signup(
    @Arg("onboarding") onboardingInput: OnboardingInput
  ): Promise<String> {
    console.log("onboardingInput", onboardingInput);

    const { user } = onboardingInput;

    const exists = await this.userRepository.findOne({
      where: {
        email: user.email.trim().toLowerCase()
      }
    });

    if (exists) {
      throw new Error("A user with that email already exists");
    }

    console.log("creating user");
    let insertUser: any = {
      name: user.firstName,
      lastName: user.lastName,
      email: user.email
      //   code: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
    };

    let newUser = new User();

    console.log("has password");
    // if given password
    if (user.password) {
      const hashedPassword = await hash(user.password, 10);
      insertUser.password = hashedPassword;
    }

    await this.userRepository.save(newUser);

    console.log("@@ newUser", newUser);

    // Generate and send back token
    const token = sign(
      { user: getUserForToken(newUser) },
      process.env.JWT_SECRET,
      {
        noTimestamp: true
      }
    );

    return token;
  }
}

// refactor this somewhere
function getUserForToken(user) {
  return {
    id: user.id,
    email: user.email,
    emailConfirmed: user.emailConfirmed,
    // blocked: user.blocked,
    // fbId: user.fbId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
