import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-doc-type-content',
  templateUrl: './doc-type-content.component.html',
  styleUrls: ['./doc-type-content.component.css']
})
export class DocTypeContentComponent implements OnInit {
  action: string;
  emitedData;

  constructor(public dialogRef: MatDialogRef<DocTypeContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.emitedData = {...data };
    this.action = this.emitedData.action;
  }
  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.emitedData });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
