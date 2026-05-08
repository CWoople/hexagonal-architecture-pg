import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL(process.cwd() + '/'));

const entry = new URL('../src/index.ts', import.meta.url).href;
await import(entry);
