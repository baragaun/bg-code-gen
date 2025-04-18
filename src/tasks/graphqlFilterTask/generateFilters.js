#!/usr/bin/env node

// This script compiles and runs the filter type generator

import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Compile the TypeScript generator
console.log('Compiling the filter type generator...');
execSync('npx tsc src/scripts/generateFilterTypes.ts --outDir dist/scripts', { stdio: 'inherit' });

// Run the compiled generator
console.log('Running the filter type generator...');
execSync('node dist/scripts/generateFilterTypes.js', { stdio: 'inherit' });

console.log('Filter types generated successfully!');
