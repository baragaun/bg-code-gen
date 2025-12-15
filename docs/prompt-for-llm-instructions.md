This project is a code generator. One of its capabilities is to create JS classes that have the 
decorators needed by `type-graphql` to handle them as GraphQL types. Each model is defined by an 
object of type `BgModelDef`. There are several project under src/projects, with a collection of 
model definitions.  They are then processed by the `ModelClassTask`.

Would you be able to write instructions for an LLM like yourself to create new model definitions,
based on models that were discussed elsewhere? For example, if an engineer discussed the building 
of a new backend, the models architecture would be crafted and eventually saved as a collection of
`BgModelDef` files. The instructions should make it possible for the LLM to create the definition
files without having access to the `bg-code-gen` project.
