import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-stage-dialog',
  templateUrl: './stage-dialog.component.html',
  styleUrls: ['./stage-dialog.component.css']
})
export class StageDialogComponent implements OnInit {
action: string;
stageData;
  constructor(public dialogRef: MatDialogRef<StageDialogComponent>, public projectService: ProjectService,
     @Inject(MAT_DIALOG_DATA) public data: StageM) {
       dialogRef.disableClose = true;
       this.stageData = {...data};
       this.action = this.stageData.action;
      }

  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({event: this.action, data: this.stageData});
  }
  closeDialog() {
    this.dialogRef.close({event: 'cancel'});
  }
}
export interface StageM {
  stage: string;
}
