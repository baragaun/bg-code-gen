import * as ts from 'typescript';
import * as fs from 'fs';

const extractImports = (
  filePath: string,
  fileContent?: string,
): string => {
  try {
    if (!fileContent) {
      fileContent = fs.readFileSync(filePath, 'utf-8');
    }

    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

    const imports: string[] = [];
    ts.forEachChild(sourceFile, (node) => {
      if (ts.isImportDeclaration(node)) {
        const importText = node.getFullText(sourceFile).trim();
        imports.push(importText);
      }
    });

    return imports.join('\n');
  } catch (error) {
    console.error('Error extracting imports:', error);
    return '';
  }
}

// Example usage
// const filePath = './example.ts'; // Replace with the path to your TypeScript file
// const imports = extractImports(filePath);
// console.log('Imports:', imports);

export default extractImports;
