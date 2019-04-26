import { Component, ViewChild } from "@angular/core";

import { trigger, animate, style, group, animateChild, query, stagger, transition } from "@angular/animations";
import { RouterOutlet } from "@angular/router";
import { MorphOutlet } from "../../../ng-morph/src/public-api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "demo2";

  @ViewChild(MorphOutlet)
  public morphOutlet: MorphOutlet;
}
