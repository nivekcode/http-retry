import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, retry, shareReplay} from 'rxjs/operators';

@Injectable()
export class GreetingService {

  private GREET_ENDPOINT = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {
  }

  greet(): Observable<string> {
    return this.httpClient.get<string>(`${this.GREET_ENDPOINT}/greet`).pipe(
      retry(3),
      catchError(() => {
        // Perform some error handling
        return EMPTY;
      }),
      shareReplay()
    );
  }
}
