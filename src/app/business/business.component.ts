import { Component, OnInit, Optional, Inject } from '@angular/core';
import { BuService, BuData } from '../services/bu.service';
import { ProjectData, ProjectService } from '../services/project.service';

import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  action: string;
  emitedData: any;
  buDwData;
  subBuDwData;
  dwdata;
  buData: BuData = {} as BuData;
  userList;
  userListD;
  shareProject: FormGroup;
  userdd = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  constructor(public buService: BuService, public router: Router, public projectService: ProjectService,
    public dialogRef: MatDialogRef<BusinessComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProjectData) {
    this.emitedData = { ...data };
    // console.log(this.emitedData);
    this.action = this.emitedData.action;
  }

  ngOnInit() {
    this.getBudata();
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.emitedData });
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

  getBudata() {
    this.projectService.getBudata().subscribe(
      (data: any) => {
        this.buDwData = data;
        // console.log(JSON.parse(this.buDwData));
        this.dwdata = JSON.parse(this.buDwData);
        if (this.action === 'Update') {
          this.onBuChange();
        }
      },
      (error) => {

      }
    );
  }


  onBuChange() {
    this.subBuDwData = this.dwdata.subbu.filter(x => x.parent === this.emitedData.bu_id);
  }


}
