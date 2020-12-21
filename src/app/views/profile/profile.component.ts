import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/auth_service/token-storage.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  listOrder;
  id;
  constructor(private tokenStorageService: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser().username;
    this.userDetail();
  }

  userDetail(){
    this.profileService.getUserByUsername(this.user).subscribe(
      (res:any)=>{
        this.id = res.data.id;
        this.getorder(this.id);
      },
      error=>{

      }
    )
  }
  // status
  getorder(id){
    this.profileService.getOrderByUser(id).subscribe(
      (res:any)=>{
        this.listOrder = res.data;
        this.listOrder.forEach(element => {
          if(element.status == "true"){
            element.status = "Giao hàng thành công"
          }
          else{
            element.status = "Đơn hàng đang được giao"
          }
        });
      },
      error=>{
        console.log(error)
      }
    )
  }
}
