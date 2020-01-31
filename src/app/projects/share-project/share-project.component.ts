import { Component, OnInit, Optional, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-share-project',
  templateUrl: './share-project.component.html',
  styleUrls: ['./share-project.component.css']
})
export class ShareProjectComponent implements OnInit {
  userListD;
  emittedData: any;
  constructor(public dialogRef: MatDialogRef<ShareProjectComponent>, public projectService: ProjectService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ShareProject) {
      dialogRef.disableClose = true;
      this.emittedData = { ...data };
      // console.log(this.emittedData);
     }
  ngOnInit() {
    this.projectService.cast.subscribe(
      data => {
        this.userListD = JSON.parse(data).users;
        // console.log(JSON.parse(data).users);
      },
      error => {
        // console.log(error);
      }
    );

  }
  arrayShuffle(a) {
    const us: string[] = [];
    a.forEach(element => {
      us.push(element.email);
    });
    return us;
  }

  shareProject() {
    this.dialogRef.close({ event: 'Share', data: this.emittedData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel', data: {} });
  }
}
export interface ShareProject {
  project_id: number;
  usernames: string;
  subject: string;
  message: string;
  email: string;
}
