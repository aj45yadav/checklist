import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-cat-grp-dialog',
  templateUrl: './cat-grp-dialog.component.html',
  styleUrls: ['./cat-grp-dialog.component.css']
})
export class CatGrpDialogComponent implements OnInit {
  action: string;
  catGrp: any;

  constructor(public dialogRef: MatDialogRef<CatGrpDialogComponent>, public projectService: ProjectService, @Inject(MAT_DIALOG_DATA)
  public data: CategoryGrp) {
    dialogRef.disableClose = true;
    this.catGrp = {...data};
    this.action = this.catGrp.action;
   }

  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({event: this.action, data: this.catGrp});
  }
  closeDialog() {
    this.dialogRef.close({event: 'cancel'});
  }
}
export interface CategoryGrp {
  name: string;
}
