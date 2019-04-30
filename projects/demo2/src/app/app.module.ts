import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {OverviewComponentComponent} from './components/overview-component/overview-component.component';
import {DetailComponentComponent} from './components/detail-component/detail-component.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MorphiumModule} from '../../../ng-morph/src/lib/ng-morph.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

export const routes: Array<any> = [
  {path: 'overview',
    component: OverviewComponentComponent,
    data: {animation: 'state1'}},
  {
    path: 'detail',
    component: DetailComponentComponent,
    data: {animation: 'state2'}
  }];

@NgModule({
  declarations: [AppComponent, DetailComponentComponent, OverviewComponentComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, MorphiumModule, MatButtonModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
