import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../questions.component';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateQuestionsComponent>, @Inject(MAT_DIALOG_DATA) public question: Question) { }

  ngOnInit() {
  }
  onCancel() {
    this.dialogRef.close();
  }
}
