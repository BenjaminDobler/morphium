import { Component, OnInit, ElementRef } from "@angular/core";
import { DataServiceService } from "../../services/data-service.service";
import { Router } from "@angular/router";
import { applyBox } from "../../../../../ng-morph/src/lib/util";

const getBox = (elm, { getMargins = false } = {}) => {
  const box = elm.getBoundingClientRect();
  const styles = getComputedStyle(elm);

  return {
    top: box.top + window.scrollY - (getMargins ? parseInt(styles.marginTop, 10) : 0),
    left: box.left + window.scrollX - (getMargins ? parseInt(styles.marginLeft, 10) : 0),
    width: box.width + (getMargins ? parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10) : 0),
    height: box.height + (getMargins ? parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10) : 0)
  };
};

@Component({
  selector: "app-overview-component",
  templateUrl: "./overview-component.component.html",
  styleUrls: ["./overview-component.component.css"]
})
export class OverviewComponentComponent implements OnInit {
  constructor(public dataService: DataServiceService, private router: Router, private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log("After View Init Overview");
  }

  selectCard(item, target) {
    this.dataService.selectedCard = item;
    // target.setAttribute("data-hero", "card");
    setTimeout(() => {
      this.router.navigate(["/detail"]);
    }, 10);
  }

  clone(el) {
    console.log("Clone ", el);

    const container = document.querySelector("#morph-holder");
    const clone = this.el.nativeElement.cloneNode(true);
    applyBox(getBox(el), clone);
    /*
    const pos = getBox(el, { getMargins: false });
    clone.style.position = "absolute";
    clone.style.left = pos.left + "px";
    clone.style.top = pos.top + "px";
    clone.style.width = pos.width + "px";
    clone.style.height = pos.height + "px";
    */

    container.appendChild(clone);
  }
}
