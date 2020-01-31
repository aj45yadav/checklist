import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from '../../constants';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-cheklist-questions',
  templateUrl: './cheklist-questions.component.html',
  styleUrls: ['./cheklist-questions.component.css']
})
export class CheklistQuestionsComponent implements OnInit {
  options = Constants.responses;
  projectId: number;
  stageId: number;
  addQuestionForm = false;
  questiondatalevel2: Question[] = [] as Question[];
  questiondatalevel3: Question[] = [] as Question[];
  currentCategory: Category = {} as Category;
  currentCategoryResponse: UserResponse[] = [] as UserResponse[];
  myControl = new FormControl();
  projectBasic;
  projectData;
  form: FormGroup;
  response;
  currentStageId;
  query: string;
  ngOnInit() {
    this.stageId = this.activatedRoute.snapshot.params['stageId'];
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.getStageData();
    this.activatedRoute.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.query = params.get('checklist');
      }
    );
  }
  constructor(public activatedRoute: ActivatedRoute, public dialog: MatDialog,
    public projectService: ProjectService, public formBuilder: FormBuilder) { }

  getStageData() {
    const request = {
      project_id: this.stageId
    };
    this.projectService.getStages(request).subscribe(
      (data: any) => {
        this.projectBasic = data;
        this.currentStageId = data.stages[0].id;
        this.getProjectData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProjectData(stageId?: any) {
    const request = {
      stage_id: stageId ? stageId : this.currentStageId
    };
    if (stageId) {
      this.currentStageId = stageId;
    }
    this.projectService.getStageData(request).subscribe(
      (data: any) => {
        this.projectData = data;
        if (this.projectData && this.projectData.catgroups) {
          this.projectData.catgroups.forEach(catagroup => {
            catagroup.categories.forEach(category => {
              category.questions.forEach(question => {
                if (question && question.selectedOption) {
                  question.selectedOption = null;
                }
              });
            });
          });
        }
        this.questiondatalevel2 = [];
        const firstCategory = data.catgroups[0] ? data.catgroups[0].categories[0] : undefined;
        if (firstCategory && firstCategory.status) {
          firstCategory.questions.forEach(question => {
            if (question.qlevel === '2') {
              this.questiondatalevel2.push(question);
            }
          });
        }
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
    this.currentCategoryResponse = [] as UserResponse[];
    this.currentCategory.questions.forEach(question => {
      const qResp: UserResponse = {
        projectId: this.projectId,
        categoryId: category.id,
        questionId: question.id,
        selectedOption: '',
        comment: '',
        file: ''
      };
      this.currentCategoryResponse.push(qResp);
    });
    // console.log(category);
  }
  getImageUrl() {
    if (isDevMode()) {
      return 'url(\'../../assets/img/diamond.png\')';
    } else {
      return 'url(\'/static/assets/img/diamond3.png\')';
    }
  }
  onTabChange(event) {
    const stage = this.projectBasic.stages[event.index];
    if (stage.name === event.tab.textLabel) {
      this.getProjectData(stage.id);
    }
  }

}

export interface Category {
  id: number;
  project_id: number;
  userId: number;
  name: string;
  questions: Question[];
  status: boolean;
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
  document: string;
  hasTooltip: boolean;
  tooltip: string;
  createdDate: Date;
  userId: number;
  editMode: boolean;
}
export interface UserResponse {
  projectId: number;
  categoryId: number;
  questionId: number;
  selectedOption: string;
  comment: string;
  file: string;
}

