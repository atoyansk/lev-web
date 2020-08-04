import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faKey = faKey;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
