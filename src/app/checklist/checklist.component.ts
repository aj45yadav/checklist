import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../constants';
import { ProjectService } from '../services/project.service';
import { DocTypeContentComponent } from './doc-type-content/doc-type-content.component';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  options = Constants.responses;
  projectId: number;
  addQuestionForm = false;
  questiondatalevel2: Question[] = [] as Question[];
  questiondatalevel3: Question[] = [] as Question[];
  currentCategory: Category = {} as Category;
  myControl = new FormControl();
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

  constructor(public activatedRoute: ActivatedRoute, public dialog: MatDialog,
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
    // tslint:disable-next-line:max-line-length
    this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === "3") && x.qlevel === '2');
    // tslint:disable-next-line:max-line-length
    // this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && x.answer_opt === selected_option || x.answer_opt === "3");
  }

  onRadioOptionChangeLevel3(parent_question_id, selected_option) {
    // tslint:disable-next-line:max-line-length
    this.questiondatalevel3 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === "3") && x.qlevel === '3');
    // tslint:disable-next-line:max-line-length
    // this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && x.answer_opt === selected_option || x.answer_opt === "3");
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    // console.log(category);
  }
  postUserResponseData(user_response) {
    const data = {
      project_id : this.projectId,
      categoryId: this.currentCategory.id,
      // selectedAns: this.currentCategory.questions.filter(x => ),
      // questions: this.currentCategory.question
    };
    console.log(data);
    // this.projectService.postUserResponse(data).subscribe(
    //   () => {},
    //   (error) => {}
    // );
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

