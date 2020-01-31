import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
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
  stageId: number;
  questiondatalevel2: Question[] = [] as Question[];
  questiondatalevel3: Question[] = [] as Question[];
  currentCategory: Category = {} as Category;
  currentCategoryResponse: UserResponse[] = [] as UserResponse[];
  projectBasic;
  projectData;
  DJANGO_SERVER = 'https://dev-checklist.regalix.com/';
  form: FormGroup;
  response;
  fileUrl;
  currentStageId;
  currentStageName;
  currentStatus;
  reviewStage;
  toolTipInfo;
  query: string;
  userRole;
  role;
  ngOnInit() {
    this.projectService.cast.subscribe(
      data => {
        this.userRole = JSON.parse(data);
        if (this.userRole) {
          this.role = this.userRole.logged_user.role;
        }
      },
      error => {
      }
    );

    this.stageId = this.activatedRoute.snapshot.params['stageId'];
    this.projectId = this.activatedRoute.snapshot.params['id'];
    // this.firstStageId = this.
    // console.log(this.stageId);

    this.getStageData();
    this.form = this.formBuilder.group({
      filedata: ['']
    });

    this.activatedRoute.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.query = params.get('checklist');
        // console.log(this.query);
      }
    );
  }
  constructor(public activatedRoute: ActivatedRoute, public dialog: MatDialog,
    public projectService: ProjectService, public formBuilder: FormBuilder) { }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('filedata').setValue(file);
    }
  }
  onSubmit(qId: number) {
    const formData = new FormData();
    formData.append('file', this.form.get('filedata').value);
    const qResp = this.currentCategoryResponse.filter((x) => x.questionId === qId)[0];
    this.projectService.uploadFiles(formData).subscribe(
      (res: any) => {
        this.response = res;
        qResp.file = res.file;
        this.fileUrl = `${this.DJANGO_SERVER}${res}`;
        // console.log(res);
        // console.log(this.fileUrl);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getStageData() {
    const request = {
      project_id: this.stageId
    };
    this.projectService.getStages(request).subscribe(
      (data: any) => {
        this.projectBasic = data;
        // console.log(this.stages);
        this.currentStageId = data.stages[0].id;
        this.currentStageName = data.stages[0].name;
        this.currentStatus = data.stages[0].active;
        this.reviewStage = data.stages[0].review;
        this.getProjectData();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProjectData(stageId?: any, name?: any, active?: any, review?: any) {
    const request = {
      stage_id: stageId ? stageId : this.currentStageId
    };
    if (stageId) {
      this.currentStageId = stageId;
      this.currentStageName = name;
      this.currentStatus = active;
      this.reviewStage = review;
    }
    this.projectService.getStageData(request).subscribe(
      (data: any) => {
        this.projectData = data;
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

  onRadioOptionClickLevel2(parent_question_id, selected_option) {
    // tslint:disable-next-line:max-line-length
    this.questiondatalevel2 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === '3') && x.qlevel === '2');
    // console.log(this.questiondatalevel2);
  }

  onRadioOptionChangeLevel3(parent_question_id, selected_option) {
    // tslint:disable-next-line:max-line-length
    this.questiondatalevel3 = this.currentCategory.questions.filter(x => x.parentid === parent_question_id && (x.answer_opt === selected_option || x.answer_opt === '3') && x.qlevel === '3');
    // console.log(this.questiondatalevel3);
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
    console.log(this.currentCategoryResponse);
  }
  postUserResponseData() {
    this.currentCategory.questions.forEach((question: any) => {
      const qResp = this.currentCategoryResponse.filter(x => x.questionId === question.id)[0];
      qResp.selectedOption = question.selectedOption;
      qResp.comment = question.comment;
    });

    const parentQuestions = this.currentCategory.questions.filter(x => x.parentid === '' || x.qlevel === '1');
    parentQuestions.forEach(parent => {
      const parent_from_resp = this.currentCategoryResponse.filter(x => x.questionId === parent.id)[0];
      const childern = this.currentCategory.questions.filter(x => x.parentid.toString() === parent.id.toString());
      childern.forEach((child: any) => {
        const child_from_resp = this.currentCategoryResponse.filter(x => x.questionId === child.id)[0];
        if (parent_from_resp && (child.answer_opt === parent_from_resp.selectedOption || child.answer_opt === '3')) {
          child_from_resp.selectedOption = child.selectedOption;
        } else {
          child_from_resp.selectedOption = undefined;
        }
      });
    });
    console.log(this.currentCategoryResponse);

    // for level 2
    // this.currentCategory.questions.filter(x => x.parentid === '' || x.qlevel === '1').forEach((question: any) => {
    //   const parentResp = this.currentCategoryResponse.filter(x => x.questionId === question.id)[0];
    //   const childern = this.currentCategory.questions.filter(x => x.parentid === question.id);
    //   childern.forEach(child => {
    //     const qResp2 = this.currentCategoryResponse.filter(x => x.questionId === child.id)[0];
    //     if (qResp2.selectedOption === parentResp.selectedOption) {
    //       qResp2.selectedOption = question.selected_option;
    //     } else {
    //       qResp2.selectedOption = undefined;
    //     }
    //   });
    // });

    // for level 3
    // this.currentCategory.questions.filter(x => x.qlevel === '2').forEach((question: any) => {
    //   const parentResp = this.currentCategoryResponse.filter(x => x.questionId === question.id)[0];
    //   const childern = this.currentCategory.questions.filter(x => x.parentid === question.id);
    //   childern.forEach(child => {
    //     const qResp2 = this.currentCategoryResponse.filter(x => x.questionId === child.id)[0];
    //     if (qResp2.selectedOption === parentResp.selectedOption) {
    //       qResp2.selectedOption = question.selected_option;
    //     } else {
    //       qResp2.selectedOption = undefined;
    //     }
    //   });
    // });

    this.projectService.postUserResponse(this.currentCategoryResponse).subscribe(
      () => {
        this.getStageData();
      },
      (error) => { }
    );
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

  getImageUrl(stage) {
    // console.log(val);
    if (!stage) {
      return;
    }
    if (isDevMode()) {
      if (stage.active) {
        return 'url(\'../../assets/img/diamond2.png\')';
      } else if (!stage.active && !stage.completed) {
        return 'url(\'../../assets/img/diamond.png\')';
      } else if (stage.completed) {
        return 'url(\'../../assets/img/diamond3.png\')';
      }
    } else {
      if (stage.active) {
        return 'url(\'/static/assets/img/diamond2.png\')';
      } else if (!stage.active && !stage.completed) {
        return 'url(\'/static/assets/img/diamond.png\')';
      } else if (stage.completed) {
        return 'url(\'/static/assets/img/diamond3.png\')';
      }
    }
  }
  getColor(stage) {
    if (!stage) {
      return;
    }
    if (stage.active) {
      return 'white';
    } else if (!stage.active && !stage.completed) {
      return 'black';
    } else if (stage.completed) {
      return '#00EFD1';
    }
  }
  getToolTipInfo(stage) {
    if (!stage) {
      return;
    }
    if (stage.active) {
      return this.toolTipInfo = 'Active Stage Ready for answer';
    } else if (!stage.active && !stage.completed) {
      return this.toolTipInfo = 'You can answer only when this stage will be active';
    } else if (stage.completed) {
      return this.toolTipInfo = 'Review is Completed';
    }
  }

  onTabChange(event) {
    const stage = this.projectBasic.stages[event.index];
    if (stage.name === event.tab.textLabel) {
      this.getProjectData(stage.id, stage.name, stage.active, stage.review);
    }
  }

  postReview(stageId?: any) {
    const request = {
      project_id: this.stageId,
      stage_id: stageId ? stageId : this.currentStageId
    };
    // console.log(request);
    this.projectService.reviewStage(request).subscribe(
      () => {
        this.getStageData();
      },
      (error) => { }
    );
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

