import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/auth/account.service';
import { SignInService } from 'src/app/auth/sign-in/sign-in.service';
import { TokenStorageService } from 'src/app/auth_service/token-storage.service';
import { DataTransferService } from 'src/app/views/search/data-transfer.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listCate: any;
  isShowMenu = false;
  listItem = ['1', '2', '3', '4'];
  search = '';
  quantity = '';
  isLoggedIn = false;
  isAdmin =false;
  user: any;
  username: any;
  count = 0;
  searchText;
  constructor(
    public router: Router,
    public headerService: HeaderService,
    public tokenStorageService: TokenStorageService,
    public loginService: SignInService,
    public accountService: AccountService,
    public toastr: ToastrService,
    public transferService: DataTransferService
    )
    {

    }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
       this.user = this.tokenStorageService.getUser().username;
       this.count = this.headerService.count;
       this.isAdmin = (this.tokenStorageService.getUser().roles[0].authority == "ROLE_ADMIN");
    }
    this.headerService.getAllCate().subscribe(
      (res: any)=>{
        this.listCate = res.data;
      },
      error =>{
        console.log(error)
      }
    )
  }

  onClickCate(){

  }

  login(){


  }
  onClickMenu(){
    this.isShowMenu = !this.isShowMenu;
  }

  onSearch(){
      if(this.searchText !== ''){
        this.transferService.clearMessages();
        this.transferService.sendMessage(this.searchText)
        this.router.navigateByUrl('/search')
      }
  }
  logout(){
    window.sessionStorage.clear();
    location.reload();
  }
}
