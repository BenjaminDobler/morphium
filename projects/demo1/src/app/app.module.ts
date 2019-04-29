import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { State1Component } from "./components/state1/state1.component";
import { State2Component } from "./components/state2/state2.component";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MorphiumModule } from "../../../ng-morph/src/lib/ng-morph.module";

@NgModule({
  declarations: [AppComponent, State1Component, State2Component],
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, MorphiumModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
