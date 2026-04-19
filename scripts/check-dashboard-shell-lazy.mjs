import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(currentDir, '..', 'dist', 'assets');
const entryChunkPattern = /^index-.*\.js$/;
const forbiddenStartupTokens = [
    'Management',
    'Marketing',
    'Mark all read',
    'admin@example.com',
];
const maxStartupBytes = 1_100_000;

const entryChunks = readdirSync(assetsDir).filter((fileName) => entryChunkPattern.test(fileName));

if (entryChunks.length === 0) {
    console.error('No startup entry chunks found in dist/assets. Run the production build first.');
    process.exit(1);
}

const startupChunkPaths = entryChunks.map((fileName) => join(assetsDir, fileName));
const startupSource = startupChunkPaths
    .map((filePath) => readFileSync(filePath, 'utf8'))
    .join('\n');
const startupBytes = startupChunkPaths.reduce(
    (total, filePath) => total + statSync(filePath).size,
    0,
);
const leakedTokens = forbiddenStartupTokens.filter((token) => startupSource.includes(token));

if (startupBytes > maxStartupBytes || leakedTokens.length > 0) {
    console.error('Dashboard shell is still leaking into the startup bundle.');
    console.error(`Startup chunk bytes: ${startupBytes}`);

    if (leakedTokens.length > 0) {
        console.error(`Found deferred shell tokens in startup chunks: ${leakedTokens.join(', ')}`);
    }

    process.exit(1);
}

console.log(`Startup chunk bytes: ${startupBytes}`);
console.log('Dashboard shell is deferred out of the startup entry chunks.');
