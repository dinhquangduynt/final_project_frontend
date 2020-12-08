import { SignInService } from './sign-in.service';
import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth_service/token-storage.service';
import { HeaderComponent } from 'src/app/themes/header/header.component';
import { HeaderService } from 'src/app/themes/header/header.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends HeaderComponent implements OnInit{
  count;
  isAdmin = false;
  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  data = {
    userName: '',
    password: '',
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.data)
    this.loginService.login(this.data).subscribe(
      (res: any) => {
        console.log(res)
        this.tokenStorageService.saveToken(res.accessToken);
        this.tokenStorageService.saveUser(res);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        alert("Đăng nhập thành công")
        this.router.navigateByUrl('/');
      },
      error=>{
        this.errorMessage = error.message;
        this.isLoginFailed = true;
        alert("Sai thông tin tài khoản hoặc mật khẩu")
        location.reload();
      }
    )
  }
}
