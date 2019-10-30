import { Component, OnInit } from '@angular/core';
import { BuData, BuService } from '../services/bu.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { map, startWith, elementAt } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { Constants } from '../constants';
import { ExistingCategoryComponent } from './existing-category/existing-category.component';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  buData: BuData = {} as BuData;
  addCategory = false;
  addQuestionForm = false;
  categoryForm: FormGroup;
  dataOfCategory: Category[] = [] as Category[];
  questiondata: Question[] = [] as Question[];
  currentCategory: Category = {} as Category;
  buMainModel: BuMainModel = {} as BuMainModel;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  mode: string;
  constructor(public activatedRoute: ActivatedRoute, public buService: BuService, public dialog: MatDialog) { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  openCreateCDialogView(catData?: Category, view?: boolean) {
    let dialogRef;
    if (view) {
      dialogRef = this.dialog.open(CreateCategoryComponent, {
        width: '650px',
        data: { name: catData.name, id: catData.id, viewMode: 'true' }
      });
    }
  }

  openCreateCDialog(catData?: Category, edit?: boolean) {
    let dialogRef;
    if (edit) {
      dialogRef = this.dialog.open(CreateCategoryComponent, {
        width: '650px',
        data: { name: catData.name, id: catData.id, editMode: 'true' }
      });
    } else {
      dialogRef = this.dialog.open(CreateCategoryComponent, {
        width: '650px',
        data: {}
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.name) {
        const category = result;
        category.id = result.id ? result.id : this.buService.generateId();
        if (result.editMode) {
          const element = this.dataOfCategory.find(x => x.id === result.id);
          const indexOfCategory = this.dataOfCategory.indexOf(element);
          this.dataOfCategory[indexOfCategory] = category;
        } else {
          this.dataOfCategory.push(category);
        }
        this.currentCategory = category;
      }
    });
  }
  openExistingCategory() {
    const dialogRef = this.dialog.open(ExistingCategoryComponent, {
      width: '650px',
      data: {}
    });
  }

  openCreateQuesDialog(subQues?: Question, edit?: boolean) {
    let dialogRef;
    if (edit) {
      this.mode = 'edit',
        dialogRef = this.dialog.open(CreateQuestionsComponent, {
          data: { parentId: subQues.parentId, ansId: subQues.ansId, question: subQues.question, id: subQues.id, editMode: 'true' }
        });

    } else {
      if (subQues) {
        dialogRef = this.dialog.open(CreateQuestionsComponent, {
          data: { parentId: subQues.id }
        });
      } else {
        dialogRef = this.dialog.open(CreateQuestionsComponent, {
          data: { parentId: -1 }
        });
      }
    }

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result && result.question) {
        // Initialize the questions array, if not initialized
        if (!this.currentCategory.questions) {
          this.currentCategory.questions = [] as Question[];
        }
        const element = this.currentCategory.questions.find(x => x.id === result.id);
        const indexOfQuestion = this.currentCategory.questions.indexOf(element);
        // Directly update the question if it was opened in edit mode
        if (result.editMode) {
          this.currentCategory.questions[indexOfQuestion] = result;
        } else {
          const question = result;
          question.id = result.id ? result.id : this.buService.generateId();
          if (question.parentId && question.parentId !== -1) {
            const parent = this.currentCategory.questions.find(x => x.id === question.parentId);
            question.qLevel = parent && parent.qLevel ? parent.qLevel + 1 : 2;
          } else {
            question.parentId = -1;
            question.ansId = -1;
            question.qLevel = 1;
          }
          this.currentCategory.questions.push(question);
          // console.log(this.currentCategory.questions);
        }
      }
    });
  }
  deleteQuestion(id: number) {
    const response = confirm('Are you sure want to delete this');
    if (response) {
      const element = this.currentCategory.questions.find(x => x.id === id);
      const index = this.currentCategory.questions.indexOf(element);
      this.currentCategory.questions.splice(index, 1);
    }
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.categoryForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      description: new FormControl(null, Validators.maxLength(150)),
    });

    const id = this.activatedRoute.snapshot.params['id'];
    const temp = localStorage.getItem('bTemp');
    this.buData = JSON.parse(temp);
    this.buMainModel.businessUnit = this.buData.businessUnit;
    this.buMainModel.subBusinessUnit = this.buData.subBusinessUnit;
    this.buMainModel.projectName = this.buData.projectName;
    this.buMainModel.categories = [] as Category[];
    console.log(this.buData);
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    // console.log(category);
  }

  addCategoryData() {
    // console.log(this.categoryForm);
    const id = this.buService.generateId();
    const category = this.categoryForm.value;
    category.id = id;
    // this.currentCategory = category;
    this.dataOfCategory.push(category);
    this.categoryForm.reset();
    console.log(this.dataOfCategory);
    this.addCategory = false;
  }

  deleteCategory(id: number) {
    const response = confirm('are you sure want to delete this');
    if (response) {
      const element = this.dataOfCategory.find(x => x.id === id);
      this.currentCategory = {} as Category;
      const index = this.dataOfCategory.indexOf(element);
      this.dataOfCategory.splice(index, 1);
      // this.dataOfCategory = [];

    }
  }

  addQuestion(form: NgForm) {
    const responses = Constants.responses;
    const cat_id = this.dataOfCategory.indexOf(this.currentCategory);
    if (!this.currentCategory.questions || this.currentCategory.questions.length === 0) {
      this.currentCategory.questions = [] as Question[];
    }
    this.currentCategory.questions.push(form.value);
    console.log(this.currentCategory.questions);
    this.dataOfCategory[cat_id] = this.currentCategory;
    this.questiondata.push(form.value);
    console.log(this.questiondata);
    this.addQuestionForm = false;
  }
}

export interface Category {
  id: number;
  projectId: number;
  userId: number;
  name: string;
  questions: Question[];
}
export interface Question {
  id: number;
  projectId: number;
  categoryId: number;
  parentId: number;
  ansId: number;
  qLevel: number;
  question: string;
  weightage: number;
  yesScore: number;
  noScore: number;
  hasTooltip: boolean;
  tooltipInfo: string;
  createdDate: Date;
  userId: number;
}

export interface BuMainModel {
  categories: Category[];
  businessUnit: string;
  subBusinessUnit: string;
  projectName: string;
}
