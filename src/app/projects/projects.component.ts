import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { BusinessComponent } from '../business/business.component';
import { BuData } from '../services/bu.service';
import {ProjectData, ProjectService } from '../services/project.service';
import { CookieService } from 'ngx-cookie-service';

export interface ProjectData {
  id: number;
  project_name: string;
  createdBy: string;
  category: number;
  quetions: number;
}
const ProjectData: BuData[] = [
  // {id: 1, project_name: 'Google', createdBy: 'Ajay Yadav', category: 5, quetions: 45 }
];
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  loading: boolean;
  dataSource = ProjectData;
  dataSourcee;
  @ViewChild(MatTable, {}) table: MatTable<any>;
  constructor(public dialog: MatDialog, public projectService: ProjectService, public cookieService: CookieService) { }

  ngOnInit() {
  this.getProjectList();
  // alert(this.cookieService.get('token'));
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(BusinessComponent, {
      width: '650px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        // this.addProject(result.data);
        this.addProject(result.data);
      } else if (result.event === 'Update') {
        this.editProject(result.data);
      } else if (result.event === 'Delete') {
        // this.deleteProject(result.data);
        this.deleteProjectt(result.data, result.id);
      } else if (result.event === 'Share') {
        this.shareProject(result.data);
      } else if (result.event === 'Status') {
        this.chanegeStatus(result.data);
      }
    });
  }
// peforming actions through api
  addProject(project_Data) {
    const data = {
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id
    };


    this.projectService.addProject(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data) => {
        // this.dataSourcee.push(data);
        this.getProjectList();
      },
      (error) => {}
    );
  }

  editProject(project_Data) {
    const data = {
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id
    };
    this.projectService.editProject(project_Data.id, data).subscribe(
      () => {
        this.getProjectList();
      },
      (error) => {}
    );
  }

  getProjectList() {
    this.loading = true;
    this.projectService.getProjectList().subscribe(
      (data) => {
        this.dataSourcee = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  deleteProjectt(project_Data, index) {
    // this.dataSourcee.splice(index, 1);
    this.projectService.deleteProject(project_Data.id).subscribe(
      (data) => {
        this.getProjectList();
      },
      (error) => {}
    );
  }
  // addProject(project_Data) {
  //   const d = new Date();
  //   this.dataSource.push({
  //     id: d.getTime(),
  //     businessUnit: project_Data.businessUnit,
  //     subBusinessUnit: project_Data.subBusinessUnit,
  //     projectName: project_Data.projectName
  //   });
  // }
  // updateProject(project_Data) {
  //   this.dataSource =  this.dataSource.filter((value, key) => {
  //     if (value.id === project_Data.id) {
  //       value.businessUnit = project_Data.businessUnit;
  //       value.subBusinessUnit = project_Data.subBusinessUnit;
  //       value.projectName = project_Data.projectName;
  //     }
  //     return true;
  //   });
  // }
  // deleteProject(project_Data) {
  //   this.dataSource = this.dataSource.filter((value, key) => {
  //     return value.id !== project_Data.id;
  //   });
  // }
  shareProject(project_Data) {

  }
  chanegeStatus(project_Data) {

  }
}
