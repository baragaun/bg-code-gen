import * as ts from 'typescript';
import * as prettier from 'prettier';
import * as fs from 'fs';

import { createVariableStatement } from './createVariableStatement.js'
import { GenerateTypeScriptOptions } from '../../types.js'

const defaultPrettierOptions: prettier.Options = {
  parser: 'typescript',
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid'
};

export const generateTypeScript = async (
  obj: any,
  options: GenerateTypeScriptOptions,
): Promise<string> => {
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false,
    omitTrailingSemicolon: false,
  });

  const sourceFile = ts.createSourceFile('temp.ts', '', ts.ScriptTarget.Latest);

  const code = printer.printNode(
    ts.EmitHint.Unspecified,
    createVariableStatement(obj, options),
    sourceFile,
  );

  const formattedCode = await prettier.format(code, options.prettier || defaultPrettierOptions);

  if (options.filePath) {
    fs.writeFileSync(options.filePath, formattedCode);
  }

  return formattedCode;
}

// Usage
// const myObj = { name: 'John', age: 30, items: [1, 2, 3, null] };
// const code = await generateTypeScript(
//   myObj, {
//     varName: 'myObject',
//     exportType: 'named',
//     filePath: 'output.ts',
//   },
// );
// console.log(code);
