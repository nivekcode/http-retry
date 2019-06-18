import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, retry, shareReplay} from 'rxjs/operators';
import {delayedRetry} from './delayedRetry.operator';

@Injectable()
export class GreetingService {

  private GREET_ENDPOINT = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  greet(): Observable<string> {
    return this.httpClient.get<string>(`${this.GREET_ENDPOINT}/greet`).pipe(
      delayedRetry(1000, 1),
      catchError(error => {
        console.log('Error', error);
        // Perform some error handling
        return EMPTY;
      }),
      shareReplay()
    );
  }
}
