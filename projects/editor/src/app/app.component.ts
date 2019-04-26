import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "editor";

  player: any;

  onChnage(val) {
    if (this.player) {
      console.log("Duration: ", this.player);
      this.player.currentTime = val;
    }
  }

  animate() {
    const ball: any = document.querySelector(".ball");
    this.player = ball.animate(
      [
        {
          transform: "translateX(0)"
        },
        {
          transform: "translateX(200px)"
        }
      ],
      {
        delay: 1500,
        duration: 2000,
        fill: "forwards"
      }
    );

    this.player.pause();
  }
}
