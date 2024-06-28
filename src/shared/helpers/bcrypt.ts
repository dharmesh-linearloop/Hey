import * as bcrypt from 'bcrypt';
import { generateSHA256Hash } from './sha256';

export function encodePassword(password: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(generateSHA256Hash(password), SALT);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(generateSHA256Hash(password), hash);
}

export function encodeEmail(email: string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(generateSHA256Hash(email), SALT);
}

export function compareEmail(email: string, hash: string) {
  return bcrypt.compareSync(generateSHA256Hash(email), hash);
}

export function ToBase64(str: string) {
  return Buffer.from(str).toString('base64');
}

export function FromBase64(str: string) {
  return Buffer.from(str, 'base64').toString();
}
