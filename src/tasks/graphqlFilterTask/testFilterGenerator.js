#!/usr/bin/env node

// This script runs the tests for the filter type generator

import { execSync } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');

// Run the tests
console.log('Running tests for the filter type generator...');
execSync('npx jest src/scripts/generateFilterTypes.test.ts', { stdio: 'inherit' });

console.log('Tests completed successfully!');
