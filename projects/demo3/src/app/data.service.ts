import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class DataService {

  public selectedAlbum: any;
  public overview: any;

  constructor(private http: HttpClient) {
    this.loadOverview();
  }


  loadOverview() {
  this.http.jsonp('https://itunes.apple.com/search?term=pearl+jam&entity=album', 'callback').subscribe((data: any)=>{
    console.log(data);
    this.overview = data.results;
  })

  }


}
