import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollnavService } from '../services/scrollnav.service';
import { CrudMethodsService } from '../services/crud-methods.service';
import { User } from '../models/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  navIsFixed: boolean;
  valor: number;
  basePath = 'users';
  basePath2 = 'advertencias';
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

  modalEmail: string;

  f: FormGroup;

  submitted = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService,
              private fb: FormBuilder,
              public toastr: ToastrService) { }

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

    showSuccess() {
      this.toastr.success('Advertência encaminhada!');
    }

    showError() {
      this.toastr.error('Algo deu errado. Por favor, tente novamente...');
    }
    showDel() {
      this.toastr.success('Usuário excluído!');
    }

  ngOnInit() {
    this.scrollToTop();

    this.crudService.getItems(this.basePath).subscribe(dado => {
      this.usuarios = dado;
      console.log(this.usuarios);
    });

    this.f = this.fb.group({
      nome    : [''],
      email   : [''],
      mensagem : ['', Validators.required]

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
      this.crudService.deleteItem(this.basePath, key).then(() => {
        this.showDel();
      }).catch((err) => {
        this.showError();
        console.log(err);
      });
    }  
  }

  adv(user) {
    this.showModal2 = true;
    this.showModal = false;
    this.modalEmail = user.email;
    this.modalName = user.nome;

    this.f.controls.nome.setValue(this.modalName);
    this.f.controls.email.setValue(this.modalEmail);
  }

  get fr() { return this.f.controls; }

  submit() {

    this.submitted = true;

    if (this.f.invalid) {
      return;
    }
 
    const {nome, email, mensagem} = this.f.value;
    const date = Date();

    let formRequest = { nome, email, mensagem, date };
    this.crudService.createItem(this.basePath2, formRequest)
      .then(() => {
          this.resetForm();
          this.showSuccess();
        }).catch((err) => {
          this.showError();
          console.log(err);
        });
  }

  resetForm() {
    this.submitted = false;
    this.f.controls.mensagem.setValue('');
    this.showModal2 = false;
  }
}
