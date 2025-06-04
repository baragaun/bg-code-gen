import * as ts from 'typescript';

import { createObjectLiteral } from './createObjectLiteral.js'
import { GenerateTypeScriptOptions } from '../../types.js'

export const createVariableStatement = (
  obj: any,
  options: GenerateTypeScriptOptions,
): ts.VariableStatement => {
  let modifiers: ts.Modifier[] | undefined;

  switch (options.exportType) {
    case 'named':
      modifiers = [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)];
      break;
    case 'default':
      modifiers = [
        ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
        ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword)
      ];
      break;
    case 'none':
    default:
      modifiers = undefined;
      break;
  }

  return ts.factory.createVariableStatement(
    modifiers,
    ts.factory.createVariableDeclarationList([
      ts.factory.createVariableDeclaration(
        options.varName,
        undefined,
        undefined,
        createObjectLiteral(obj)
      )
    ], ts.NodeFlags.Const)
  );
}
