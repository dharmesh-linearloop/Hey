import * as crypto from 'crypto';
import { BinaryToTextEncoding } from 'crypto';

export const generateSHA256Hash = (
  data: string,
  encoding: BinaryToTextEncoding = 'hex',
) => crypto.createHash('sha256').update(data).digest(encoding);
