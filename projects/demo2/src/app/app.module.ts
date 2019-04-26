import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { OverviewComponentComponent } from "./components/overview-component/overview-component.component";
import { DetailComponentComponent } from "./components/detail-component/detail-component.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgMorphModule } from "../../../ng-morph/src/lib/ng-morph.module";
import { EditorComponent } from "./components/editor/editor.component";
import { FormsModule } from "@angular/forms";

export const routes: Array<any> = [{ path: "overview", component: OverviewComponentComponent, data: { animation: "state1" } }, { path: "detail", component: DetailComponentComponent, data: { animation: "state2" } }];

@NgModule({
  declarations: [AppComponent, DetailComponentComponent, OverviewComponentComponent, EditorComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), BrowserAnimationsModule, NgMorphModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
