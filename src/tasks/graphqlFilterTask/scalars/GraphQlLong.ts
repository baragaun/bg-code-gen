import { GraphQLScalarType, Kind } from 'graphql';
import { Long } from 'mongodb';

// Custom Long scalar for 64-bit integers
export const GraphQlLong = new GraphQLScalarType({
  name: 'Long',
  description: 'Long type for 64-bit integer',

  serialize(value: unknown): string {
    if (value instanceof Long) {
      return value.toString();
    }
    if (typeof value === 'number') {
      return Long.fromNumber(value).toString();
    }
    if (typeof value === 'string') {
      return value;
    }
    throw new Error(`GraphQlLong can't serialize value: ${value}`);
  },

  parseValue(value: unknown): Long {
    if (typeof value === 'string') {
      return Long.fromString(value);
    }
    if (typeof value === 'number') {
      return Long.fromNumber(value);
    }
    throw new Error(`GraphQlLong can't parse value: ${value}`);
  },

  parseLiteral(ast: any): Long {
    if (ast.kind === Kind.STRING) {
      return Long.fromString(ast.value);
    }
    if (ast.kind === Kind.INT) {
      return Long.fromString(ast.value);
    }
    throw new Error(`GraphQlLong can only parse string or integer values`);
  },
});
