import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiBaseUrl: string;
  constructor(public http: HttpClient, private cookieService: CookieService) {
    if (isDevMode()) {
      this.apiBaseUrl = 'http://dev-checklist.regalix.com/';
      // this.apiBaseUrl = 'http://localhost:3000/';
    } else {
      this.apiBaseUrl = '/';
    }
  }


  // project CRUD api
  getProjectData(id) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view/' + id;
    return this.http.get(url, httpOptions);
  }
  getProjectList() {
    const token = this.cookieService.get('token');
    console.log('Cookie is ' + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-list/';
    return this.http.get(url, httpOptions);
  }
  addProject(data) {
    const token = this.cookieService.get('token');
    // const allCookies: {} = this.cookieService.getAll();
    console.log('Cookie is ' + token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addproject/';
    return this.http.post(url, data, httpOptions);
  }
  editProject(id, data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
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
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-delete/' + id;
    return this.http.delete(url, httpOptions);
  }

// category CRUD api
  getCategory(id) {
    const body = {
      project_id: id
    };
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'project-view/';
    return this.http.post(url, body, httpOptions);
  }
  addCategory(data) {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'addcat/';
    return this.http.post(url, data, httpOptions);
  }
  editCategory(id, data) {
    const url = this.apiBaseUrl + 'edit-category/' + id;
    return this.http.patch(url, data);
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
  editQuestionsData(id, data) {
    const url = this.apiBaseUrl + 'edit-question/' + id;
    return this.http.patch(url, data);
  }
  deleteQestions(id) {
    const url = this.apiBaseUrl + 'delete-question/' + id;
    return this.http.delete(url);
  }
  // get bu data API call
  getBudata() {
    const token = this.cookieService.get('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'token ' + token
      })
    };
    const url = this.apiBaseUrl + 'get-bu/' ;
    return this.http.get(url, httpOptions);
  }
  getSubBuData() {
    const url = this.apiBaseUrl + 'get-subBu';
    return this.http.get(url);
  }
}

export interface ProjectData {
  bu_id: number;
  sub_bu_id: number;
  buname: string;
  subBuName: string;
  name: string;
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
