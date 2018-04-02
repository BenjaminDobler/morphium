import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { State1Component } from './components/state1/state1.component';
import { State2Component } from './components/state2/state2.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyRouterOutlet } from './MyRouterOutlet';


@NgModule({
  declarations: [
    AppComponent,
    State1Component,
    State2Component,
    MyRouterOutlet
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
