import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollnavService } from '../services/scrollnav.service';
import { CrudMethodsService } from '../services/crud-methods.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  navIsFixed: boolean;
  valor: number;
  basePath = 'users';
  usuarios: any = [];

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService) { }

  // scroll to top
  @HostListener('window:scroll', [])
    onWindowScroll() {
      this.valor = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (this.valor > 50) {
        this.navIsFixed = true;
        this.scrollserv.setdata(this.navIsFixed);
      } else if (this.navIsFixed && this.valor < 30) {
        this.navIsFixed = false;
        this.scrollserv.setdata(this.navIsFixed);
      }
      console.log(this.valor);
    }
      scrollToTop() { (function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

  ngOnInit() {
    this.scrollToTop();

    this.crudService.getItems(this.basePath).subscribe(dado => {
      this.usuarios = dado;
      console.log(this.usuarios);
    });
  }

}
