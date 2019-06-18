import {Observable, concat, throwError} from 'rxjs';
import {delay, retryWhen, take} from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) =>
  `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up`;

const DEFAULT_MAX_RETRIES = 5;
const INITIAL_REQUEST = 1;

export function delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) =>
        concat(
          errors.pipe(
            delay(delayMs),
            take(maxRetry + INITIAL_REQUEST),
          ),
          throwError(getErrorMessage(maxRetry))
        )
      )
    );
}
