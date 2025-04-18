import { GraphQLScalarType, Kind } from 'graphql'

export const GraphQlJson = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON custom scalar type',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value);
    }
    return null;
  }
})
