import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuService } from 'src/app/services/bu.service';
import { Category } from '../questions.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  action: string;
  emitedCategoryData: any;

  public dataOfCategory: Category[] = [] as Category[];
  mode: string;

  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, public buService: BuService,
    @Inject(MAT_DIALOG_DATA) public data: Category) {
      this.emitedCategoryData = {...data};
      this.action = this.emitedCategoryData.action;
    }

  ngOnInit() {

  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.emitedCategoryData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

