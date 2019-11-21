import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
// import {Lazy} from '../helpers'
// import {Event} from './event'
// import {Household} from './household'
// import {Image} from './image'
// import {PrivateImage} from './private-image'

// export enum IdentityStatus {
//   UnSubmitted,
//   Pending,
//   Accepted,
// }

// registerEnumType(IdentityStatus, {
//   name: 'IdentityStatus', // this one is mandatory
//   description: 'The status of a users identity id',
// })

@ObjectType()
@Entity()
export class User {
  // For Gifted Chat
  @Field(type => ID)
  get _id(): number {
    return this.id;
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field({ nullable: false })
  @Column({ nullable: false, default: false })
  emailConfirmed: boolean;

  @Field(type => String)
  get firstName(): string {
    return this.name;
  }

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: "" })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  passwordCode: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  pushToken: string;

  @Field()
  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}
