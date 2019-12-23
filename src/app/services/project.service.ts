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
checkForToke() {
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
    const token = this.cookieService.get('token');
    // console.log('Cookie is ' + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-list/';
    return this.http.get(url, httpOptions);
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
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'edit-project/';
    return this.http.post(url, data, httpOptions);
  }
  deleteProject(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-delete/' + id;
    return this.http.delete(url, httpOptions);
  }


  getCategory(id) {
    const body = {
      project_id: id
    };
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view/';
    return this.http.post(url, body, httpOptions);
  }

  getStageData(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view-extend/';
    return this.http.post(url, data, httpOptions);
  }

  // category CRUD api
  addCategory(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addcat/';
    return this.http.post(url, data, httpOptions);
  }
  editCategory(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'edit-category/';
    return this.http.post(url, data, httpOptions);
  }
  deleteCategory(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'delete-category/' + id;
    return this.http.delete(url, httpOptions);
  }
  // questions CRUD api
  getQuestionsData() {
    const url = this.apiBaseUrl + '';
    return this.http.get(url);
  }
  addQuestionsData(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addquestion/';
    return this.http.post(url, data, httpOptions);
  }
  editQuestionsData(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'edit-question/';
    return this.http.post(url, data, httpOptions);
  }
  deleteQestions(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'delete-question/' + id;
    return this.http.delete(url, httpOptions);
  }
  // get bu data API call
  getBudata() {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'get-bu/';
    return this.http.get(url, httpOptions);
  }
  getSubBuData() {
    const url = this.apiBaseUrl + 'get-subBu';
    return this.http.get(url);
  }

  getUserDeatails() {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'user-details/';
    return this.http.get(url, httpOptions);
  }
  sharedProjectViaMail(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'send-question/';
    return this.http.post(url, data, httpOptions);
  }
  uploadFiles(formData) {
    const url =  this.apiBaseUrl + 'file-upload/';
    return this.http.post(url, formData);
  }
  // user reponse post
  postUserResponse(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'submit-category/';
    return this.http.post(url, data, httpOptions);
  }
  //  stages CTUD api
  addStages(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addstage/';
    return this.http.post(url, data, httpOptions);
  }

  editStage(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'edit-stage/';
    return this.http.post(url, data, httpOptions);
  }

  deleteStage(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'delete-stage/' + id;
    return this.http.delete(url, httpOptions);
  }

  getStages(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view-base/';
    return this.http.post(url, data, httpOptions);
  }

  // category group api
  addCategoryGroup(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addcatgroup/';
    return this.http.post(url, data, httpOptions);
  }
  editCategoryGropup(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'edit-catgroup/';
    return this.http.post(url, data, httpOptions);
  }
  deleteCategoryGroup(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'delete-catgroup/' + id;
    return this.http.delete(url, httpOptions);
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
