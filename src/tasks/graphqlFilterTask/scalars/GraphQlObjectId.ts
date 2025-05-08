import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const GraphQlObjectId = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId custom scalar type',

  serialize(value: unknown): string {
    if (value instanceof ObjectId) {
      return value.toHexString();
    }
    if (typeof value === 'string') {
      return value;
    }
    throw new Error(`GraphQlObjectId can't serialize value: ${value}`);
  },

  parseValue(value: unknown): ObjectId {
    if (typeof value === 'string') {
      return new ObjectId(value);
    }
    throw new Error(`GraphQlObjectId can't parse value: ${value}`);
  },

  parseLiteral(ast: any): ObjectId {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value);
    }
    throw new Error(`GraphQlObjectId can only parse string values`);
  },
});
