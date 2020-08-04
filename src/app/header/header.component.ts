import { Component, OnInit, Inject } from '@angular/core';
import { ScrollnavService } from '../services/scrollnav.service';
import { AuthService } from '../services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navIsAffix: boolean;
  navbarOpen = false;

  constructor(private scrollserv: ScrollnavService,
              public authService: AuthService,
              @Inject(DOCUMENT) private document: Document) {
    this.getData();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
}

  getData() {
    this.scrollserv.scrollChange.subscribe(value => {
        this.navIsAffix = value;
        console.log(this.navIsAffix);
      });
  }


  ngOnInit() {
  }

}
