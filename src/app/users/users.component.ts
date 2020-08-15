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

  showModal = false;
  showModal2 = false;

  detModal;
  modalName: string;
  modalSobre: string;
  modalKey: string;
  modalImgDet: string;
  modalImgs;
  modalBusca: string;
  modalMPraticas: string;
  modalPraticas: Array<object>;
  modalECivil: string;
  modalFilhos: string;
  modalCigarro: string;
  modalBebida: string;
  modalInteresses: Array<object>;

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

  generateArray(obj) {
    return Object.keys(obj).map((key) => obj[key]);
  }


  open(user) {
    this.showModal = true;
    this.modalName = user.nome;
    this.modalSobre = user.sobre;
    this.modalKey = user.key;
    this.modalImgDet = user.destaque;
    this.modalBusca = user.busca;
    this.modalImgs = user.fotos;
    this.modalMPraticas = user.minhasPraticas;
    this.modalPraticas = user.praticas;
    this.modalECivil = user.eCivil;
    this.modalFilhos = user.filhos;
    this.modalCigarro = user.cigarro;
    this.modalBebida = user.bebida;
    this.modalInteresses = user.interesses;
    console.log(user);
  }

  delUser(name, key){
    if(confirm("Tem certeza que quer excluir "+name+"?")) {
      console.log(name, key);
      this.crudService.deleteItem(this.basePath, key);
    }  
  }

  adv() {
    this.showModal2 = true;
  }
}
