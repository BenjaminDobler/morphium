import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {DataService} from './data.service';
import { OverviewComponent } from './components/overview/overview.component';
import {Route, RouterModule} from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import {NgMorphModule} from '../../../ng-morph/src/lib/ng-morph.module';



const routes: Route[] = [
  {
    path: 'overview',
    component: OverviewComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(routes),
    NgMorphModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
