import {of, throwError} from 'rxjs';
import {tap, switchMap} from 'rxjs/operators';
import {TestScheduler} from 'rxjs/testing';

import {delayedRetry} from './delayedRetry.operator';

const SCHEDULER_ASSERT_FN = (actual, expected) => {
  expect(actual).toEqual(expected);
};

describe('delayedRetry', () => {

  it('must return the value if source observable return a value', () => {
    const scheduler = new TestScheduler(SCHEDULER_ASSERT_FN);
    scheduler.run(helpers => {
      const {cold, expectObservable, flush} = helpers;
      const source$ = cold('--a|');
      const expectedMarble = '--a|';

      const result$ = source$.pipe(delayedRetry(1000, 5));
      expectObservable(result$).toBe(expectedMarble);
      flush();
    });
  });

  it('must throw an error after all the retires failed', () => {
    const scheduler = new TestScheduler(SCHEDULER_ASSERT_FN);
    scheduler.run(helpers => {
      const {cold, expectObservable, flush} = helpers;
      const expectedErrorMessage = 'Tried to load Resource over XHR for 5 times without success. Giving up';
      const source$ = cold('#');
      const expectedMarble = '------#';

      const result$ = source$.pipe(delayedRetry(1, 5));
      expectObservable(result$).toBe(expectedMarble, null, expectedErrorMessage);
      flush();
    });
  });

  it('must throw an error after all the retires failed', () => {
    const scheduler = new TestScheduler(SCHEDULER_ASSERT_FN);
    scheduler.run(helpers => {
      const {expectObservable, flush} = helpers;

      let counter = 0;
      const data = 'Some data';
      const source$ = of(counter).pipe(
        tap(() => counter++),
        switchMap(() => (counter < 4 ? throwError('Error') : of(data)))
      );
      const expectedMarble = '---(a|)';

      const result$ = source$.pipe(delayedRetry(1, 5));
      expectObservable(result$).toBe(expectedMarble, {a: data});
      flush();
    });
  });
});
