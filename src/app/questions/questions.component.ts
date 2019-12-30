import { Component, OnInit } from '@angular/core';
import { BuData, BuService } from '../services/bu.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Observable, from, Subscription } from 'rxjs';
import { map, startWith, elementAt } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { Constants } from '../constants';
import { ExistingCategoryComponent } from './existing-category/existing-category.component';
import { ProjectService } from '../services/project.service';
import { CatGrpDialogComponent } from './cat-grp-dialog/cat-grp-dialog.component';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  private paramSubscription: Subscription;
  projectId: any;
  stageId: number;
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
  projectBasic;
  catGroup;
  loading: boolean;
  url;
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

    this.projectId = this.activatedRoute.snapshot.params['stageId'];
    this.stageId = this.activatedRoute.snapshot.params['id'];
    this.getProjectData();
    this.getStagesData();
  }

  constructor(public activatedRoute: ActivatedRoute, public buService: BuService, public dialog: MatDialog,
    public projectService: ProjectService, public router: Router) { }
  // category Group add, edit and delete
  categoryGrpDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(CatGrpDialogComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addCatGroup(result.data);
      } else if (result.event === 'Update') {
        this.editCatGroup(result.data);
      } else if (result.event === 'Delete') {
        this.deleteCatGroup(result.data);
      }
    });
  }
  addCatGroup(catGroup) {
    const request = {
      stage_id: this.stageId,
      name: catGroup.name,
    };
    this.projectService.addCategoryGroup(request).subscribe(
      (data) => {
        // this.projectData.push(request);
        this.getStagesData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editCatGroup(catGroup) {
    const request = {
      catgroup_id: catGroup.catgroup_id,
      name: catGroup.name,
    };
    this.projectService.editCategoryGropup(request).subscribe(
      () => {
        this.getStagesData();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCatGroup(catGroup) {
    this.projectService.deleteCategoryGroup(catGroup.catgroup_id).subscribe(
      () => {
        this.getStagesData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
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
      }
    });
  }
  addCategoryD(cat_data) {
    // const data: Category = {
    //   id: 0,
    //   project_id: this.projectId,
    //   name: cat_data.name,
    //   desc: cat_data.desc,
    //   questions: []
    // };
    // this.projectService.addCategory(data).subscribe(
    //   (response: any) => {
    //     const id = response.category_id;
    //     if (this.projectData.categories || this.projectData.categories.length || 0) {
    //       this.projectData.categories = [];
    //     } else {
    //       data.id = id;
    //       this.projectData.categories.push(data);
    //     }
    const data = {
      project_id: this.projectId,
      catgroup_id: cat_data.catgroup_id,
      name: cat_data.name,
      desc: cat_data.desc,
    };
    this.projectService.addCategory(data).subscribe(
      (response: any) => {
        this.getStagesData();
      });
  }
  editCategory(cat_data) {
    const data = {
      category_id: cat_data.id,
      project_id: this.activatedRoute.snapshot.paramMap['id'],
      name: cat_data.name,
      desc: cat_data.desc
    };
    this.projectService.editCategory(data).subscribe(
      () => {
        this.getStagesData();
      },
      (error) => {

      }
    );
  }
  deleteCategoryD(cat_data) {
    this.projectService.deleteCategory(cat_data.id).subscribe(
      () => {
        this.getStagesData();
      },
      (error) => {
      }
    );
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
    // console.log(request);
    this.projectService.addQuestionsData(request).subscribe(
      (response: any) => {
        this.getStagesData();
      },
      (error) => { }
    );
  }

  deleteQuestionData(que_data) {
    this.projectService.deleteQestions(que_data.id).subscribe(
      () => {
        this.getStagesData();
      },
      (error) => { }
    );
  }
  editQuestionsData(que_data) {
    const data = {
      question_id: que_data.id,
      question: que_data.question,
      answer_opt: que_data.answer_opt,
      tooltip: que_data.tooltip,
      weightage: que_data.weightage,
      score: que_data.score
    };
    this.projectService.editQuestionsData(data).subscribe(
      () => {
        this.getStagesData();
       },
      (error) => { }
    );
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
    this.loading = true;
    const request = {
      project_id: this.projectId
    };
    this.projectService.getStages(request).subscribe(
      (data: any) => {
        this.projectBasic = data;
        // console.log(this.stages);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getStagesData() {
    this.loading = true;
    const request = {
      stage_id: this.stageId
    };
    this.projectService.getStageData(request).subscribe(
      (data: any) => {
        this.projectData = data;
        // console.log(this.stages);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }


  setCurrentCategory(category: Category) {
    this.currentCategory = category;
    // console.log(category);
  }

}

export interface Category {
  id: number;
  project_id: number;
  name: string;
  desc: string;
  questions: Question[];
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
