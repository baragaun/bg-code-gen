# bg-code-gen

Baragaun code generator

## Usage

First copy your project into `src/projects`. Then run it with:

    ts-node src/projects/<project-name>/index.ts

See the [sample-project](./src/sample-project) for a sample project setup.

## Tasks

### [TypeGraphqlTask](src/tasks/typeGraphqlTask/index.ts)

This task currently handles the attributes of a model and applies the
appropriate decorators for [TypeGraphQL](https://typegraphql.com/).

Given a model class with the `@ObjectType` decorator:

    @ObjectType()
    export class Animal {
      // @bg-codegen:class.attr
      // @bg-codegen:/class.attr

      constructor(attributes?: Partial<User>) {
        super(attributes)

        if (attributes) {
          // @bg-codegen:class.const.attr
          // @bg-codegen:/class.const.attr
        }
      }
    }

Instead of defining its attributes right in the class, define them in a `TypeGraphqlClass` object:

    const animal: TypeGraphqlClass = {
      name: 'Animal',
      graphqlType: GraphqlType.ObjectType,
      extends: 'BaseModel',
      path: 'src/services/zoo/types/classes/Animal.ts',
      dbCollectionName: 'animals',
      active: true,
      attributes: [
        { name: 'species', dataType: 'string' },
        { name: 'subSpecies', dataType: 'string' },
        { name: 'family', dataType: 'string' },
        { name: 'familyname', dataType: 'string' },
        { name: 'discoveredAt', dataType: 'date', optional: true },
        { name: 'extinctSince', dataType: 'date', optional: true },
      ]
    }

Then run the `TypeGraphqlTask` to generate the attributes in the model. 

