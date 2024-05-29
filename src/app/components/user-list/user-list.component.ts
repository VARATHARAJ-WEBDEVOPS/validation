import { Component, OnInit } from '@angular/core';
import { Column, Formatter, GridOption } from 'angular-slickgrid';
import { CouchService } from 'src/app/sercices/couch.service';

const editIconFormater: Formatter = (cell: number, row: number, value: string) =>
  `<i class="fas fa-pen"></i>`;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData: any[] = [];
  dataset: any[] = [];
  columnDefinitions!: Column[];
  gridOptions!: GridOption;

  constructor(public service: CouchService) {
    this.columnDefinitions = [
      { id: 'userId', cssClass: 'text-center', name: 'User Id', field: 'userId', sortable: true },
      { id: 'userName', cssClass: 'text-center', name: 'User Name', field: 'userName', sortable: true },
      { id: 'mail', cssClass: 'text-center', name: 'Mail', field: 'mail', sortable: true },
      { id: 'activeStatus', cssClass: 'text-center', name: '<span class="tableHeader">Active</span>', field: 'activeStatus', sortable: true },
      { id: 'id', cssClass: 'text-center', name: '<span style="color: blue">Edit</span>', field: 'id', sortable: true,formatter: editIconFormater }
    ];

    this.gridOptions = {
      enableAutoResize: true,
      enableSorting: true,
      enablePagination: true,
      
      // gridHeight: 400,
      // gridWidth: 720,
      pagination: {
        pageSizes: [10, 20, 25, 50],
        pageSize: 10
      },
    };
  }

  ngOnInit(): void {
    this.readUser();
  }

  readUser() {
    this.service.readUser().subscribe((res: any) => {
    this.userData = res.rows.map((user: any, index: number) => user.doc.data )
    
    for (let i = 0; i < this.userData.length; i++) {
          this.userData[i].id = i;
    }
    
    console.log(this.userData);
      this.dataset = this.userData;
    })
  }



}
