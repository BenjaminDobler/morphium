import { Component, OnInit, Input } from "@angular/core";
import { MorphOutlet } from "../../../../../ng-morph/src/public-api";

@Component({
  selector: "editor-component",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"]
})
export class EditorComponent implements OnInit {
  @Input()
  public set outlet(value: MorphOutlet) {
    // console.log("Outlet set ", value);
    this._outlet = value;
  }

  public get outlet(): MorphOutlet {
    return this._outlet;
  }

  private _outlet: MorphOutlet;
  constructor() {}

  ngOnInit() {}

  play() {
    this.outlet.sharedTransitionManager.play();
  }

  onPlayhead(val) {
    console.log("Val ", val);
    this.outlet.sharedTransitionManager.setTime(val);
  }
}
