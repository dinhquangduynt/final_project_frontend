import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AccountManagementService } from '../services/account-management.service';
declare  var $ : any;
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  [x: string]: any;
  listAcc;
  isEdit =false;
  searchText;
  constructor(private accountService: AccountManagementService,
              private toastr: ToastrService
  ) { }
 
  
  dataAcc = {
    id: '',
    fullname: '',
    birthday: '',
    email:'',
    address: '',
    password: '',
    userName: '',
    phoneNumber: '',
    updateBy: '',
    update_date: '',
    createBy: '',
    create_date: '',
    roles : [
      {
        id : '',
        name : this.Rolesname
      }
    ]
  }
  role = [
    {
      id : 2,
      name : 'ROLE_USER'
    },
    {
      id : 1,
      name : 'ROLE_ADMIN'
    }
  ]
  resetData(){
    this.dataAcc = {
      id: '',
      fullname: '',
      birthday: '',
      email:'',
      address: '',
      password: '',
      userName: '',
      phoneNumber: '',
      updateBy: '',
      update_date: '',
      createBy: '',
      create_date: '',
      roles : [
        {
          id : this.dataAcc.id,
          name : 'ROLE_ADMIN'
        }
      ]
    }
  }
  ngOnInit(): void {
    this.getAll()
    this.getUserById();
  }
  getAll(){
    this.accountService.getAll().subscribe(
      (res:any)=>{
        this.listAcc = res.data;
        console.log(this.listAcc)
      },
      err=>{

      }
    )
  }
  listAll;
  getUserById(){
    this.accountService.getDetail(1).subscribe(
      (res:any)=>{
        this.listAll = res.data;
      }
    )
  }

  update() {
    this.dataAcc.roles[0].name = this.dataAcc.roles[0].id=='1' ? 'user' : 'admin' 
    if(this.isEdit){
      this.accountService.update(this.dataAcc).subscribe(res => {
        this.toastr.success('Cập nhật thành công')
        this.getAll();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    } else {
      this.accountService.create(this.dataAcc).subscribe(res => {
        this.toastr.success('Thêm thành công')
        this.getAll();
        $('#modalEdit').modal('hide');
      }, err => {

      })
    }

  }

  addNew() {
    this.isEdit = false;
    this.resetData();
  }
  delete(id){
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa không?',
      text: "Bạn sẽ không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.accountService.delete(id).subscribe(
            (res:any)=>{
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              this.getAll();
            },
            err=>{
              console.log(err)
            }
          )
      }
      else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Type product is safe',
          'error'
        )
      }
    })
    
  }
}
