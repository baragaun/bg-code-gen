#!/usr/bin/env node

// This script updates the package.json file with the new scripts

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Read the current package.json
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Add the new scripts
packageJson.scripts['generate-filters'] = 'node src/scripts/generateFilters.js';
packageJson.scripts['test-filter-generator'] = 'node src/scripts/testFilterGenerator.js';

// Update the build scripts to run the filter generator
packageJson.scripts.build = packageJson.scripts.build.replace('rm -rf dist && ', 'rm -rf dist && npm run generate-filters && ');
packageJson.scripts['build-prod'] = packageJson.scripts['build-prod'].replace('rm -rf dist && ', 'rm -rf dist && npm run generate-filters && ');

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('Updated package.json with new scripts!');
