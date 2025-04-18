import { expect } from 'chai';
import { generateModelFilterClass } from './generateFilterTypes.js';

describe('Filter Type Generator', () => {
  test('generates filter class for a simple schema', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string', maxLength: 32 },
        name: { type: 'string' },
        age: { type: 'integer' },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string', format: 'date-time' },
        tags: { type: 'array', items: { type: 'string' } }
      }
    };

    const result = generateModelFilterClass('User', schema);

    // Check that the result contains the expected filter class
    expect(result).to.contain('@InputType()');
    expect(result).to.contain('export class UserFilter extends FilterInput');

    // Check that the result contains filter fields for each property
    expect(result).to.contain('id?: StringFilterInput');
    expect(result).to.contain('name?: StringFilterInput');
    expect(result).to.contain('age?: NumberFilterInput');
    expect(result).to.contain('isActive?: BooleanFilterInput');
    expect(result).to.contain('createdAt?: DateFilterInput');
    expect(result).to.contain('tags?: ArrayFilterInput');
  });

  test('generates nested filter classes for object properties', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string', maxLength: 32 },
        name: { type: 'string' },
        address: {
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            zipCode: { type: 'string' }
          }
        }
      }
    };

    const result = generateModelFilterClass('User', schema);

    // Check that the result contains the nested filter class
    expect(result).to.contain('export class UserAddressFilter');

    // Check that the result contains filter fields for the nested properties
    expect(result).to.contain('street?: StringFilterInput');
    expect(result).to.contain('city?: StringFilterInput');
    expect(result).to.contain('zipCode?: StringFilterInput');

    // Check that the main filter class references the nested filter class
    expect(result).to.contain('address?: UserAddressFilter');
  });

  test('generates nested filter classes for array items that are objects', () => {
    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string', maxLength: 32 },
        name: { type: 'string' },
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              content: { type: 'string' },
              publishedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    };

    const result = generateModelFilterClass('User', schema);

    // Check that the result contains the nested filter class
    expect(result).to.contain('export class UserPostsItemFilter');

    // Check that the result contains filter fields for the nested properties
    expect(result).to.contain('title?: StringFilterInput');
    expect(result).to.contain('content?: StringFilterInput');
    expect(result).to.contain('publishedAt?: DateFilterInput');

    // Check that the main filter class uses ArrayFilterInput for the array
    expect(result).to.contain('posts?: ArrayFilterInput');
  });
});
