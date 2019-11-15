import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuService } from 'src/app/services/bu.service';
import { Category } from '../questions.component';
import { ProjectService } from 'src/app/services/project.service';

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

  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, public buService: BuService, public projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: Category) {
      dialogRef.disableClose = true;
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

