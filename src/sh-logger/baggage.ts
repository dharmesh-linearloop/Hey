import {
  getAuthenticatedUser,
  getDomainFromUrl,
} from '@salesahandy/observability';
import { AxiosRequestConfig } from 'axios';
import { logger } from '.';
/**
 * Adds baggage to headers.
 * Baggage are strictly added to the internal services http calls.
 *
 * Headers must be in "uberctx-YouDataKey" format.
 *
 * @link https://opentelemetry.io/docs/concepts/signals/baggage/
 *
 * @param headers Request Headers.
 */
export const addBaggageToHeaders = (config: AxiosRequestConfig) => {
  try {
    const { headers, url } = config;
    const requestDomain = getDomainFromUrl(url);

    const applicationUrl = process.env.SH_CLIENT_BASE_URL;
    const internalDomain = getDomainFromUrl(applicationUrl);

    if (requestDomain !== internalDomain) {
      return;
    }

    const user = getAuthenticatedUser();
    if (user) {
      headers['uberctx-userEmail'] = user.email;
    }
  } catch (error) {
    logger.error(`addBaggageToHeaders.error.${error}`);
  }
};
