#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get CLI arguments
const [, , command, ...restArgs] = process.argv;

const rawMigrationName = restArgs.join(' ').trim();

if (command !== 'create' || !rawMigrationName) {
  console.error('Usage: sqlpage-migration-mgr create [migration_name]');
  process.exit(1);
}

// Get full UTC timestamp in YYYYMMDD_HHmmss format
const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0].slice(0, 15);


// Sanitize migration name for filename
const safeMigrationName = rawMigrationName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '_')   // Replace non-alphanumerics with underscores
  .replace(/^_+|_+$/g, '');      // Trim leading/trailing underscores

const filename = `${timestamp}_${safeMigrationName}.sql`;

// Construct paths
const baseDir = path.join(process.cwd(), 'sqlpage', 'migrations');
const filePath = path.join(baseDir, filename);

// Ensure directories exist
fs.mkdirSync(baseDir, { recursive: true });

// Create empty file
let counter = 0;
let finalPath = filePath;

while (fs.existsSync(finalPath)) {
  counter += 1;
  finalPath = path.join(baseDir, `${timestamp}_${safeMigrationName}_${counter}.sql`);
}
fs.writeFileSync(finalPath, '-- SQL migration\n');

console.log(`Created migration: ${filePath}`);
