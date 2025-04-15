import { logApiError, ErrorSeverity } from './logging';

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  retryableStatusCodes?: number[];
  onRetry?: (error: Error, retryCount: number) => void;
}

/**
 * Retry a function with exponential backoff
 * 
 * @param fn The async function to retry
 * @param options Retry configuration options
 * @returns The result of the function or throws an error after max retries
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    retryableStatusCodes = [408, 429, 500, 502, 503, 504],
    onRetry = () => {},
  } = options;

  let lastError: Error;
  let delay = initialDelay;

  for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Check if we should retry based on status code
      const statusCode = (error as any)?.response?.status;
      const isRetryable = !statusCode || retryableStatusCodes.includes(statusCode);
      
      if (retryCount === maxRetries || !isRetryable) {
        throw lastError;
      }

      // Log the retry attempt
      logApiError(
        lastError,
        ErrorSeverity.LOW,
        'ApiRetry',
        {
          retryCount,
          statusCode,
          delay,
        }
      );

      // Call the onRetry callback
      onRetry(lastError, retryCount);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Increase delay for next retry with exponential backoff
      delay = Math.min(delay * backoffFactor, maxDelay);
    }
  }

  // This should never be reached due to the throw in the loop
  throw lastError!;
}

/**
 * Creates a retry-enabled version of an API function
 * 
 * @param apiFn The API function to wrap with retry logic
 * @param options Retry configuration options
 * @returns A new function with retry capability
 */
export function createRetryableApi<T extends (...args: any[]) => Promise<any>>(
  apiFn: T,
  options: RetryOptions = {}
): T {
  return ((...args: Parameters<T>) => {
    return withRetry(() => apiFn(...args), options);
  }) as T;
}
