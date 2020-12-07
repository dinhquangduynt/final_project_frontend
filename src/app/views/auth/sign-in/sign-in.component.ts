import { SignInService } from './sign-in.service';
import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  data = {
    username: '',
    password: '',
  }
  constructor(private loginService: SignInService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.data).subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigateByUrl('/');
    })
  }
}
