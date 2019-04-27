import {Component, OnInit} from '@angular/core';
import {SharedElementTransitionManager} from '../sharedelementtransitionmanager';

@Component({
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {


  public transitionManager: SharedElementTransitionManager;

  constructor() {
  }

  ngOnInit() {
  }

  play() {
    this.transitionManager.play();
  }

  onPlayhead(val) {
    this.transitionManager.setTime(val);
  }
}
