import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  collapedSideBar: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}

}
