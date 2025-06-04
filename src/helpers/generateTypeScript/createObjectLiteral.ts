import * as ts from 'typescript'

export const createObjectLiteral = (value: any): ts.Expression => {
  if (value === null) {
    return ts.factory.createNull()
  }

  if (value === undefined) {
    return ts.factory.createIdentifier('undefined')
  }

  switch (typeof value) {
    case 'string':
      // Use single quotes by creating a string literal with single quotes
      return ts.factory.createStringLiteral(value, true) // true for single quotes
    case 'number':
      return ts.factory.createNumericLiteral(value)
    case 'boolean':
      return value ? ts.factory.createTrue() : ts.factory.createFalse()
    case 'function':
      return ts.factory.createStringLiteral(value.toString(), true)
    case 'object':
      if (Array.isArray(value)) {
        return ts.factory.createArrayLiteralExpression(
          value.map(createObjectLiteral)
        )
      }

      const properties = Object.entries(value).map(([key, val]) => {
        // Use identifier for valid property names, quoted strings for others
        const propertyName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
          ? ts.factory.createIdentifier(key)
          : ts.factory.createStringLiteral(key, true)

        return ts.factory.createPropertyAssignment(
          propertyName,
          createObjectLiteral(val)
        )
      })

      return ts.factory.createObjectLiteralExpression(properties, true)
    default:
      return ts.factory.createStringLiteral(String(value), true)
  }
}
