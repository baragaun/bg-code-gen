import { Field, InputType, registerEnumType } from 'type-graphql';

// Define sort direction enum
export enum SortDirection {
  ASC = 1,
  DESC = -1
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
  description: 'Sort direction for query results',
});

// Base filter input type with logical operators
// @ts-ignore
@InputType()
export abstract class FilterInput {
  // @ts-ignore
  @Field(() => [FilterInput], { nullable: true })
  AND?: FilterInput[];

  // @ts-ignore
  @Field(() => [FilterInput], { nullable: true })
  OR?: FilterInput[];

  // @ts-ignore
  @Field(() => FilterInput, { nullable: true })
  NOT?: FilterInput;
}

// String filter operators
// @ts-ignore
@InputType()
export class StringFilterInput {
  // @ts-ignore
  @Field(() => String, { nullable: true })
  eq?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  ne?: string;

  // @ts-ignore
  @Field(() => [String], { nullable: true })
  in?: string[];

  // @ts-ignore
  @Field(() => [String], { nullable: true })
  nin?: string[];

  // @ts-ignore
  @Field(() => String, { nullable: true })
  gt?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  gte?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  lt?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  lte?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  regex?: string;

  // @ts-ignore
  @Field(() => String, { nullable: true })
  options?: string;

  // @ts-ignore
  @Field(() => Boolean, { nullable: true })
  exists?: boolean;
}

// Date filter operators
// @ts-ignore
@InputType()
export class DateFilterInput {
  // @ts-ignore
  @Field(() => Date, { nullable: true })
  eq?: Date;

  // @ts-ignore
  @Field(() => Date, { nullable: true })
  ne?: Date;

  // @ts-ignore
  @Field(() => Date, { nullable: true })
  gt?: Date;

  // @ts-ignore
  @Field(() => Date, { nullable: true })
  gte?: Date;

  // @ts-ignore
  @Field(() => Date, { nullable: true })
  lt?: Date;

  // @ts-ignore
  @Field(() => Date, { nullable: true })
  lte?: Date;

  // @ts-ignore
  @Field(() => Boolean, { nullable: true })
  exists?: boolean;
}

// Array filter operators
// @ts-ignore
@InputType()
export class ArrayFilterInput {
  // @ts-ignore
  @Field(() => Number, { nullable: true })
  size?: number;

  // @ts-ignore
  @Field(() => [String], { nullable: true })
  all?: string[];

  // @ts-ignore
  @Field(() => Boolean, { nullable: true })
  exists?: boolean;
}

// Object filter operators
// @ts-ignore
@InputType()
export class ObjectFilterInput {
  // @ts-ignore
  @Field(() => Boolean, { nullable: true })
  exists?: boolean;
}

// Pagination input
// @ts-ignore
@InputType()
export class PaginationInput {
  // @ts-ignore
  @Field(() => Number, { defaultValue: 0 })
  skip: number = 0;

  // @ts-ignore
  @Field(() => Number, { defaultValue: 20 })
  limit: number = 20;
}

// Sort field input
// @ts-ignore
@InputType()
export class SortFieldInput {
  // @ts-ignore
  @Field()
  field: string = '';

  // @ts-ignore
  @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
  direction: SortDirection = SortDirection.ASC;
}
