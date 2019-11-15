import { Component, OnInit } from '@angular/core';
import { BuData, BuService } from '../services/bu.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith, elementAt } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../constants';
import { ProjectService } from '../services/project.service';
import { CreateCategoryComponent } from '../questions/create-category/create-category.component';
import { CreateQuestionsComponent } from '../questions/create-questions/create-questions.component';
import { ExistingCategoryComponent } from '../questions/existing-category/existing-category.component';
import { asTextData } from '@angular/core/src/view';
import { DocTypeContentComponent } from './doc-type-content/doc-type-content.component';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  options = Constants.responses;
  projectId: number;
  buData: BuData = {} as BuData;
  addCategory = false;
  addQuestionForm = false;
  categoryForm: FormGroup;
  dataOfCategory: Category[] = [] as Category[];
  questiondatalevel2: Question[] = [] as Question[];
  questiondatalevel3: Question[] = [] as Question[];
  currentCategory: Category = {} as Category;
  buMainModel: BuMainModel = {} as BuMainModel;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  mode: string;
  projectData;
  DJANGO_SERVER = 'http://dev-checklist.regalix.com/';
  form: FormGroup;
  response;
  fileUrl;
  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.getProjectData();

    this.form = this.formBuilder.group({
      filedata: ['']
    });
  }

  constructor(public activatedRoute: ActivatedRoute, public buService: BuService, public dialog: MatDialog,
    public projectService: ProjectService, public formBuilder: FormBuilder) { }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('filedata').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('filedata').value);

    this.projectService.uploadFiles(formData).subscribe(
      (res) => {
        this.response = res;
        this.fileUrl = `${this.DJANGO_SERVER}${res}`;
        // console.log(res);
        // console.log(this.fileUrl);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProjectData() {
    this.projectService.getCategory(this.projectId).subscribe(
      (data) => {
        this.projectData = data;
      });
  }

  onRadioOptionChangeLevel2(parent_question_id, selected_option) {
    this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === "3") && x.qlevel === '2');
    // this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && x.answer_opt === selected_option || x.answer_opt === "3");
  }

  onRadioOptionChangeLevel3(parent_question_id, selected_option) {
    this.questiondatalevel3 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === "3") && x.qlevel === '3');
    // this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && x.answer_opt === selected_option || x.answer_opt === "3");
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    // console.log(category);
  }
  openDocModel(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DocTypeContentComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Docx') {

      } else if (result.event === 'Link') {

      } else if (result.event === 'PDF') {

      } else if (result.event === 'Comment') {

      }
    });
  }
  addDocxFile(docx_data) { }
  addLink(link_data) { }
  addPDF(pdf_data) { }
  addComment(comment_data) { }
}

export interface Category {
  id: number;
  project_id: number;
  userId: number;
  name: string;
  questions: Question[];
  viewMode: boolean;
  editMode: boolean;
}
export interface Question {
  id: number;
  projectId: number;
  categoryId: number;
  parentid: string;
  answer_opt: string;
  qlevel: string;
  question: string;
  weightage: number;
  score: number;
  hasTooltip: boolean;
  tooltip: string;
  createdDate: Date;
  userId: number;
  editMode: boolean;
}

export interface BuMainModel {
  categories: Category[];
  businessUnit: string;
  subBusinessUnit: string;
  projectName: string;
}

