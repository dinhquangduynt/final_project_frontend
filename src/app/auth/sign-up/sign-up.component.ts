import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { TokenStorageService } from 'src/app/auth_service/token-storage.service';
import { HeaderComponent } from 'src/app/themes/header/header.component';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends HeaderComponent implements OnInit {
  data = {
    fullname : '',
    email: '',
    birthday: '',
    address: '',
    phoneNumber: '',
    userName: '',
    password: ''
  }
  matchPass;
  
  // constructor(private accountService: AccountService, private tokenService:TokenStorageService,private router: Router) { }

  ngOnInit(): void {
  }
  register(){
    this.accountService.create(this.data).subscribe(
      (res:any)=>{
        alert('đăng ký thành công')
        this.router.navigateByUrl('login')
      },
      error=>{
        console.log(error)
      }
    )
  }

}
