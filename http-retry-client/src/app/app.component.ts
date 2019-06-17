import {Component} from '@angular/core';
import {GreetingService} from './greeting.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  greeting$: Observable<string>;

  constructor(private greetingService: GreetingService) {
  }

  talkToTheServer(): void {
    this.greeting$ = this.greetingService.greet();
  }
}
