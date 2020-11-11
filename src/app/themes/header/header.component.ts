import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShowMenu = false;
  listItem = ['1', '2', '3', '4']
  constructor(
    private router: Router,
    ) { }

  ngOnInit(): void {
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
