import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(public data: DataService, private router: Router) {
  }

  ngOnInit() {
  }

  selectAlbum(album) {
    this.data.selectedAlbum = album;
    setTimeout(() => {
      this.router.navigate(['detail']);

    }, 10);
  }

}
