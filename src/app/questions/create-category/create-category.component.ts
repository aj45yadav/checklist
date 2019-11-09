import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BuService } from 'src/app/services/bu.service';
import { Category } from '../questions.component';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  public dataOfCategory: Category[] = [] as Category[];
  mode: string;
  constructor(public dialogRef: MatDialogRef<CreateCategoryComponent>, public buService: BuService,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}
  ngOnInit() {
    // this.categoryForm = new FormGroup({
    //   name: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    //   description: new FormControl(null, Validators.maxLength(150)),
    // });
  }
  onCancel() {
    this.dialogRef.close();
  }
}

