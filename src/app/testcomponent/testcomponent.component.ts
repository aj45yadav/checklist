import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatTable } from '@angular/material';
import { TestDialogComponent } from './test-dialog/test-dialog.component';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  // { id: 1560608769632, name: 'Artificial Intelligence' },
  // { id: 1560608796014, name: 'Machine Learning' },
  // { id: 1560608787815, name: 'Robotic Process Automation' },
  // { id: 1560608805101, name: 'Blockchain' }
];
@Component({
  selector: 'app-testcomponent',
  templateUrl: './testcomponent.component.html',
  styleUrls: ['./testcomponent.component.css']
})
export class TestcomponentComponent {
  displayedColumns: string[] = ['slno', 'id', 'name', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, {}) table: MatTable<any>;

  constructor(public dialog: MatDialog) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(TestDialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj) {
    let d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name
    });
    this.table.renderRows();

  }
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }
}
