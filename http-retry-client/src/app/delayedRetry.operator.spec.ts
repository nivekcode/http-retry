import {Observable, of, throwError} from 'rxjs';
import {tap, switchMap} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/testing';

import {delayedRetry} from './delayedRetry.operator';

const SCHEDULER_ASSERT_FN = (actual, expected) => {
  expect(actual).toEqual(expected);
};

describe('delayedRetry', () => {

  let scheduler: TestScheduler;

  beforeEach(() => scheduler = new TestScheduler(SCHEDULER_ASSERT_FN));

  it('must return the value if the source observable emits a value', () => {
    scheduler.run(({cold, expectObservable}) => {
      const source$ = cold('--a|');
      const expectedMarble = '--a|';

      const result$ = source$.pipe(delayedRetry(1000, 5));
      expectObservable(result$).toBe(expectedMarble);
    });
  });

  it('must throw an error after all the retires failed', () => {
    scheduler.run(({cold, expectObservable}) => {
      const expectedErrorMessage = 'Tried to load Resource over XHR for 5 times without success. Giving up';
      const source$ = cold('#');
      const expectedMarble = '------#';

      const result$ = source$.pipe(delayedRetry(1, 5));
      expectObservable(result$).toBe(expectedMarble, null, expectedErrorMessage);
    });
  });

  it('must return the value even the first three attempts fail', () => {
    scheduler.run(({expectObservable}) => {
      let failedAttempts = 0;
      const result = 'Real madrid is the best club ever';
      const source$ = of(failedAttempts).pipe(
        tap(() => failedAttempts++),
        switchMap(() => (failedAttempts <= 3 ? throwError('Error') : of(result)))
      );
      const expectedMarble = '1s 1s 1s (a|)';

      const result$ = source$.pipe(delayedRetry(1000, 5));
      expectObservable(result$).toBe(expectedMarble, {a: result});
    });
  });
});
