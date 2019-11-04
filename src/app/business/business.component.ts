import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BuService, BuData } from '../services/bu.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
action: string;
emitedData: any;

  buData: BuData = {} as BuData;
  constructor(public buService: BuService, public router: Router, public dialogRef: MatDialogRef<BusinessComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: BuData) {
      console.log(data);
      this.emitedData = { ...data };
      this.action = this.emitedData.action;
     }
  ngOnInit() {
  }
  doAction() {
    this.dialogRef.close({event: this.action, data: this.emitedData});
  }
  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
  onNext() {
    const id = this.emitedData.id;
    this.buData = { id: id, businessUnit: '', subBusinessUnit: '', projectName: '' };
    const serialized = JSON.stringify(this.buData);
    localStorage.setItem('bTemp', serialized);
    this.router.navigate(['/questions', id]);
    this.closeDialog();
  }
}
