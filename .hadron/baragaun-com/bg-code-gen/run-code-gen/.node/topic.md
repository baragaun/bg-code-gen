## Purpose

The code generator generates the model properties in the JS classes that the model definition file links to.

For that, all model definition files are copied into the `bg-code-gen` project, and the code generator is run
there, updating the model classes in the original project.

## Learn

- [bg-code-gen topic](../bg-code-gen/topic.md)

## Arguments

(none)

## Steps

### Step 1: Determine the username of the engineer

```shell
yq '.engineer.username' .local-dev-settings/local-dev-settings.yaml
```

### Step 2: Run the code generator script for that engineer

```shell
tools/bg-code-gen/bg-code-gen-<engineer-username>.sh
```

### Step 3: Review the changes in the model classes

The model class file paths are defined in the `path` field of the model definition files.


### Step 4: Add missing includes in class files

If properties use types that have not yet been included, add those includes.
