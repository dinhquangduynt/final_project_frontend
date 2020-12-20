import { HeaderService } from './../../../themes/header/header.service';
import { TokenStorageService } from './../../../auth_service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public pushRightClass: string;
  isLoggedIn = false;
  isAdmin =false;
  user: any;
  username: any;

    constructor(public router: Router,   public tokenStorageService: TokenStorageService, private headerService: HeaderService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.isLoggedIn = !!this.tokenStorageService.getToken();

        if (this.isLoggedIn) {
           this.user = this.tokenStorageService.getUser().username;
           this.isAdmin = (this.tokenStorageService.getUser().roles[0].authority == "ROLE_ADMIN");
        }
        if(!this.isAdmin){
          this.router.navigateByUrl("/");
        }
    }


    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigateByUrl("/");
    }

}
