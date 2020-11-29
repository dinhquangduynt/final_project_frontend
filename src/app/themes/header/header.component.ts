import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listCate: any;
  isShowMenu = false;
  listItem = ['1', '2', '3', '4']
  constructor(
    private router: Router,
    private headerService: HeaderService
    ) { }

  ngOnInit(): void {
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
    // console.log('loss');
    // this.router.navigate(['/signin']);

  }
  onClickMenu(){
    this.isShowMenu = !this.isShowMenu;
  }
}
