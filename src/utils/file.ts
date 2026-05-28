import * as path from 'path';
import * as fs from 'fs';

export function readFromFile<T>(fileName: string): T {
  const filePath = path.resolve(
    process.cwd(),
    'src',
    'config',
    'database',
    'seeds',
    fileName,
  );

  const data = fs.readFileSync(filePath, 'utf-8');

  return JSON.parse(data) as T;
}
