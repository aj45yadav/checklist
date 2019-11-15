import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../questions.component';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {
  action: string;
  emittedQuestionData: any;

  constructor(public dialogRef: MatDialogRef<CreateQuestionsComponent>, @Inject(MAT_DIALOG_DATA) public data: Question,
   public projectService: ProjectService) {
    dialogRef.disableClose = true;
    this.emittedQuestionData = {...data};
    this.action = this.emittedQuestionData.action;
   }

  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.emittedQuestionData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
