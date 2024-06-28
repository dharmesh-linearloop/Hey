import { pinoLogger, pino } from '@salesahandy/observability';
import { SERVICE_NAME } from '../keys';

export const logger: pino.Logger = pinoLogger({
  service: SERVICE_NAME,
  lokiBaseUrl: process.env.LOKI_BASE_URL,
  withStdout: !!Number(process.env.WITH_STDOUT),
  interval: 3,
});
