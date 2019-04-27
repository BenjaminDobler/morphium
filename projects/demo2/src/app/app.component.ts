import {Component, ViewChild} from '@angular/core';


import {MorphOutlet} from '../../../ng-morph/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo2';

  @ViewChild(MorphOutlet)
  public morphOutlet: MorphOutlet;
}
