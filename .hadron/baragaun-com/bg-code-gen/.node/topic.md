`bg-code-gen` is a code generator that manages the properties of JS classes with the
decorators needed by `type-graphql` to handle them as GraphQL types. Each model is defined
by an object of type `BgModelDef`.

The model definition files are here: `tools/bg-code-gen/modelDefs`.

Each model definition has a `path` field that points to the JS class file that it defines.

It cannot create the classes, but only handles its properties.
