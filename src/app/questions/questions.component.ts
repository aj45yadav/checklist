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
import { ProjectService } from '../services/project.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  projectId: number;
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
  projectData;

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

    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.getProjectData();
  }

  constructor(public activatedRoute: ActivatedRoute, public buService: BuService, public dialog: MatDialog,
    public projectService: ProjectService) { }
  // category related all functions
  openCategoryDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addCategoryD(result.data);
      } else if (result.event === 'Update') {
        this.editCategory(result.data);
      } else if (result.event === 'Delete') {
        this.deleteCategoryD(result.data);
      } else if (result.event === 'View') {
        this.viewCategory(result.data);
      }
    });
  }
  addCategoryD(cat_data) {
    const data = {
      project_id: this.projectId,
      name: cat_data.name
    };
    this.projectService.addCategory(data).subscribe(
      () => {
        this.getProjectData();
      });
  }
  editCategory(cat_data) {
    const data = {
      project_id: this.activatedRoute.snapshot.paramMap['id'],
      name: cat_data.name
    };
    this.projectService.editCategory(cat_data.id, data).subscribe(
      () => {

      },
      (error) => {

      }
    );
  }
  deleteCategoryD(cat_data) {
    this.projectService.deleteCategory(cat_data.id).subscribe(
      () => {
        this.getProjectData();
      },
      (error) => {
      }
    );
  }
  viewCategory(cat_data) {

  }
  //  end category related functions

  // questions related functions
  openQuestionsDialog(action, obj) {
    console.log(obj);
    obj.action = action;
    // if (this.currentCategory.questions && this.currentCategory.questions.length === 0) {
    //   obj.parentid = '';
    // }
    const dialogRef = this.dialog.open(CreateQuestionsComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addQuestionsData(result.data);
      } else if (result.event === 'Update') {
        this.editQuestionsData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteQuestionData(result.data);
      } else if (result.event === 'View') {
        this.viewQuestionsData(result.data);
      }
    });
  }

  addQuestionsData(que_data) {
    const parent = que_data.parentid ? this.currentCategory.questions.find(x => x.id === que_data.parentid) : undefined;
    // const id = que_data.parentid === undefined || '' ? 1 : parent && parent.qlevel ? parent.qlevel + 1 : 2;
    const request = {
      question: que_data.question,
      parent_id: que_data.parentid ? que_data.parentid : '',
      answer_opt: que_data.answer_opt,
      tooltip: que_data.tooltip,
      category_id: this.currentCategory.id,
      project_id: this.projectId,
      qlevel: que_data.parentid === '' ? 1 : parent && parent.qlevel ? parseInt(parent.qlevel.toString(), 10) + 1 : 2,
      weightage: que_data.weightage,
      score: que_data.score
    };
    console.log(request);
    this.projectService.addQuestionsData(request).subscribe(
      (response: any) => {
        this.getProjectData();
      },
      (error) => { }
    );
  }

  deleteQuestionData(que_data) {
    this.projectService.deleteQestions(que_data.id).subscribe(
      () => {
        this.getProjectData();
      },
      (error) => { }
    );
  }
  editQuestionsData(que_data) {

  }
  viewQuestionsData(que_data) {

  }
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

  getProjectData() {
    this.projectService.getCategory(this.projectId).subscribe(
      (data) => {
        this.projectData = data;
      });
  }


  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    // console.log(category);
  }

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
  ansId: number;
  qlevel: number;
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
