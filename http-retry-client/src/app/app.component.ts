import {Component} from '@angular/core';
import {GreetingService} from './greeting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http-retry-client';

  constructor(private greetingService: GreetingService) {
    this.greetingService.greet().subscribe(e => console.log('Got the result', e));
  }
}
