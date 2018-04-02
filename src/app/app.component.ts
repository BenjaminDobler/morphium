import { Component, NgZone, Renderer2, ViewChild } from '@angular/core';
import { group, transition, trigger, query, style, animate, AnimationBuilder } from '@angular/animations';
import { SharedElementTransitionManager } from './transition/sharedelementtransitionmanager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  /*
  animations: [
    trigger('childRouteAnimation', [
      transition('* => *', [
        group([
          query(':enter', [
            style({opacity: 0}),
            animate('0.35s ease-in', style({opacity: 1}))
          ], {optional: true}),
          query(':leave', [
            animate('0.35s ease-in', style({opacity: 0}))
          ], {optional: true})
        ])
      ])
    ])
  ]
  */
})
export class AppComponent {
  title = 'app';

  @ViewChild('routerOutlet')
  public outlet: any;

  private sharedTransitionManager: SharedElementTransitionManager;

  player: any;


  constructor(private an: Renderer2, private zone:NgZone) {

  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(()=>{
      this.sharedTransitionManager = new SharedElementTransitionManager(this.outlet, true);
    });
  }

  animationDone(event: AnimationEvent) {

  }




  animationStarted(event: AnimationEvent) {

    let a: any = this.an;
    if (a.delegate.engine.players.length > 0) {
      this.player = a.delegate.engine.players[0]._player;
      //this.player.pause();
    }

  }

  onActivated(evt) {

  }


  play() {
    this.sharedTransitionManager.play();
  }

  pause() {
    this.sharedTransitionManager.pause();
  }


  seek(val) {
    console.log("Seek ", val);
    this.sharedTransitionManager.seek(val);
  }


  prepRouteState(outlet: any) {
    //console.log('outlet.activatedRouteData', outlet.activatedRoute);
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }

}
