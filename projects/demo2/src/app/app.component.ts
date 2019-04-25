import { Component } from "@angular/core";

import { trigger, animate, style, group, animateChild, query, stagger, transition } from "@angular/animations";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "demo2";
}
