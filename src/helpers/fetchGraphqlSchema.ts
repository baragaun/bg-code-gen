import { buildClientSchema, getIntrospectionQuery } from 'graphql';
import { GraphQLSchema } from 'graphql'
import fetch from 'node-fetch';

const fetchGraphqlSchema= async (endpoint: string): Promise<GraphQLSchema> => {
  console.log(`Fetching GraphQL schema from ${endpoint}...`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to download schema: ${response.statusText}`);
    }

    const result: any = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    // Build a client schema from the introspection result
    return buildClientSchema(result.data);
  } catch (error) {
    console.error('Error downloading schema:', error);
    throw error;
  }
}

export default fetchGraphqlSchema;
