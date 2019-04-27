import { Component, OnInit } from "@angular/core";
import { DataServiceService } from "../../services/data-service.service";

@Component({
  selector: "app-detail-component",
  templateUrl: "./detail-component.component.html",
  styleUrls: ["./detail-component.component.css"]
})
export class DetailComponentComponent implements OnInit {
  constructor(public data: DataServiceService) {}

  ngOnInit() {}
}
