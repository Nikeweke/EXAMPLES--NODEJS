import { resolve } from 'path'

export function getEnvPath(): string {
  return resolve(
    __dirname,
    `../../envs/.env${ '.' + process.env.NODE_ENV || ''}`,
  );
}
