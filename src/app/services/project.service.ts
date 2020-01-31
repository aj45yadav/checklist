import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public Users: BehaviorSubject<any> = new BehaviorSubject(null);
  cast = this.Users.asObservable();
  apiBaseUrl: string;
  imagePath: string;
  constructor(public http: HttpClient, private cookieService: CookieService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'https://dev-checklist.regalix.com/';
    } else {
      this.apiBaseUrl = '/';
    }
  }
  getImagepath() {
    if (isDevMode()) {
      return '../../assets/img';
    } else {
      return '/static/assets/img';
    }
  }

  setSubject(value) {
    if (value) {
      this.Users.next(value);
    } else {
      this.Users.next([]);
    }
  }
checkForToken() {
  const token = this.cookieService.get('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}
  // project CRUD api
  getProjectData(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view/' + id;
    return this.http.get(url, httpOptions);
  }
  getProjectList() {
    // const token = this.cookieService.get('token');
    // console.log('Cookie is ' + token);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'token ' + token
    //   })
    // };
    const url = this.apiBaseUrl + 'project-list/';
    return this.http.get(url);
  }
  addProject(data) {
    const token = this.cookieService.get('token');
    // const allCookies: {} = this.cookieService.getAll();
    // console.log('Cookie is ' + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addproject/';
    return this.http.post(url, data, httpOptions);
  }
  editProject(data) {
    const url = this.apiBaseUrl + 'edit-project/';
    return this.http.post(url, data);
  }
  deleteProject(id) {
    const url = this.apiBaseUrl + 'project-delete/' + id;
    return this.http.delete(url);
  }


  getCategory(id) {
    const body = {
      project_id: id
    };
    const url = this.apiBaseUrl + 'project-view-extend/';
    return this.http.post(url, body);
  }

  getStageData(data) {
    const url = this.apiBaseUrl + 'project-view-extend/';
    return this.http.post(url, data);
  }

  // category CRUD api
  addCategory(data) {
    const url = this.apiBaseUrl + 'addcat/';
    return this.http.post(url, data);
  }
  editCategory(data) {
    const url = this.apiBaseUrl + 'edit-category/';
    return this.http.post(url, data);
  }
  deleteCategory(id) {
    const url = this.apiBaseUrl + 'delete-category/' + id;
    return this.http.delete(url);
  }
  // questions CRUD api
  getQuestionsData() {
    const url = this.apiBaseUrl + '';
    return this.http.get(url);
  }
  addQuestionsData(data) {
    const url = this.apiBaseUrl + 'addquestion/';
    return this.http.post(url, data);
  }
  editQuestionsData(data) {
    const url = this.apiBaseUrl + 'edit-question/';
    return this.http.post(url, data);
  }
  deleteQestions(id) {
    const url = this.apiBaseUrl + 'delete-question/' + id;
    return this.http.delete(url);
  }
  // get bu data API call
  getBudata() {
    const url = this.apiBaseUrl + 'get-bu/';
    return this.http.get(url);
  }
  getSubBuData() {
    const url = this.apiBaseUrl + 'get-subBu';
    return this.http.get(url);
  }

  getUserDeatails() {
    const url = this.apiBaseUrl + 'user-details/';
    return this.http.get(url);
  }
  sharedProjectViaMail(data) {
    const url = this.apiBaseUrl + 'send-question/';
    return this.http.post(url, data);
  }
  uploadFiles(formData) {
    const url =  this.apiBaseUrl + 'file-upload/';
    return this.http.post(url, formData);
  }
  // user reponse post
  postUserResponse(data) {
    const url = this.apiBaseUrl + 'submit-category/';
    return this.http.post(url, data);
  }
  //  stages CTUD api
  addStages(data) {
    const url = this.apiBaseUrl + 'addstage/';
    return this.http.post(url, data);
  }

  editStage(data) {
    const url = this.apiBaseUrl + 'edit-stage/';
    return this.http.post(url, data);
  }

  deleteStage(id) {
    const url = this.apiBaseUrl + 'delete-stage/' + id;
    return this.http.delete(url);
  }

  getStages(data) {
    const url = this.apiBaseUrl + 'project-view-base/';
    return this.http.post(url, data);
  }

  // category group api
  addCategoryGroup(data) {
    const url = this.apiBaseUrl + 'addcatgroup/';
    return this.http.post(url, data);
  }
  editCategoryGropup(data) {
    const url = this.apiBaseUrl + 'edit-catgroup/';
    return this.http.post(url, data);
  }
  deleteCategoryGroup(id) {
    const url = this.apiBaseUrl + 'delete-catgroup/' + id;
    return this.http.delete(url);
  }

  // marks as review as completed api
  reviewStage(data) {
    const url = this.apiBaseUrl + 'submit-stage/';
    return this.http.post(url, data);
  }

  // publish project to user
  publishProject(data) {
    const url = this.apiBaseUrl + 'project-publish/';
    return this.http.post(url, data);
  }

}

export interface ProjectData {
  id: number;
  project_id: number;
  bu_id: number;
  sub_bu_id: number;
  buname: string;
  subBuName: string;
  name: string;
  desc: string;
  creator: string;
  sub_bu: string;
  bu: string;
  status: boolean;
}

export interface CategoryData {
  name: string;
}

export interface QuestionsData {
  parent_id: number;
  answer_opt: number;
  tooltip: string;
  qlevel: number;
  weightage: number;
  score: number;
}
