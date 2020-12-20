import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  listContact;
  constructor(private contactService: ContactService, private formBuilder: FormBuilder) { }

  dataContact = {
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    message: '',
    updateBy: '',
    update_date: '',
    createBy: '',
    create_date: ''
  }

  order = {
    a:'',
    orderDetails: [
      {

      }
    ]
  }

  isSend = false;
  ngOnInit(): void {

  }
  Create() {
    this.contactService.create(this.dataContact).subscribe(
      (res: any) => {
        this.isSend = true;
        this.resetForm();
      },
      err => {
        console.log(err)
      }
    )
  }

  resetForm(){
    this.dataContact = {
      id: '',
      name: '',
      address: '',
      email: '',
      phone: '',
      message: '',
      updateBy: '',
      update_date: '',
      createBy: '',
      create_date: ''
    }
  }

}
