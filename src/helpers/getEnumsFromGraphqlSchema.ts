import { GraphQLEnumType, GraphQLSchema } from 'graphql';
import { EnumInfo } from '../types.js'

/**
 * Interface representing an enumeration extracted from a GraphQL schema
 */

/**
 * Extracts all enumerations from a GraphQL schema
 * @param schema - The GraphQL schema object
 * @returns An array of enum information objects
 */
export const getEnumsFromGraphqlSchema = (schema: GraphQLSchema): EnumInfo[] => {
  const typeMap = schema.getTypeMap();
  const enums: EnumInfo[] = [];

  Object.values(typeMap).forEach((type) => {
    // Skip built-in types (they start with "__")
    if (type.name.startsWith('__')) {
      return;
    }

    // Check if the type is an enum
    if (type instanceof GraphQLEnumType) {
      const enumType = type as GraphQLEnumType;
      const enumValues = enumType.getValues().map(value => value.name);

      enums.push({
        name: enumType.name,
        values: enumValues,
        description: enumType.description || undefined
      });
    }
  });

  return enums;
};

export default getEnumsFromGraphqlSchema;
