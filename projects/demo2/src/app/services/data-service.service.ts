import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataServiceService {
  public data: any[] = [{ title: "Some title 1" }, { title: "Some title 2" }, { title: "Some title 3" }, { title: "Some title 4" }, { title: "Some title 5" }, { title: "Some title 6" }, { title: "Some title 7" }, { title: "Some title 8" }];

  selectedCard: any;

  constructor() {
    this.selectedCard = this.data[0];
  }
}
