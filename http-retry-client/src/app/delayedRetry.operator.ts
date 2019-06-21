import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, retryWhen} from 'rxjs/operators';

const getErrorMessage = (maxRetry: number) =>
  `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up`;

const DEFAULT_MAX_RETRIES = 5;

export function delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap(error => {
          if (maxRetry-- > 0) {
            return of(error);
          } else {
            return throwError(getErrorMessage(maxRetry));
          }
        })
      ))
    );
}
