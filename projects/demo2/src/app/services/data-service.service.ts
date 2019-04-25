import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataServiceService {
  public data: any[] = [{ title: "Some title" }, { title: "Some title" }, { title: "Some title" }, { title: "Some title" }, { title: "Some title" }, { title: "Some title" }, { title: "Some title" }, { title: "Some title" }];

  selectedCard: any;

  constructor() {}
}
