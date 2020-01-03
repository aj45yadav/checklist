import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { BusinessComponent } from '../business/business.component';
import { BuData } from '../services/bu.service';
import { ProjectData, ProjectService } from '../services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { ShareProjectComponent } from './share-project/share-project.component';
import { Router } from '@angular/router';

export interface ProjectData {
  id: number;
  project_name: string;
  createdBy: string;
  category: number;
  quetions: number;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  loading: boolean;
  dataSource;
  @ViewChild(MatTable, {}) table: MatTable<any>;
  constructor(public dialog: MatDialog, public projectService: ProjectService, public cookieService: CookieService,
     public router: Router) { }

  ngOnInit() {
    this.getProjectList();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(BusinessComponent, {
      width: '650px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addProject(result.data);
      } else if (result.event === 'Update') {
        this.editProject(result.data);
      } else if (result.event === 'Delete') {
        this.deleteProjectt(result.data, result.id);
      } else if (result.event === 'Share') {
      } else if (result.event === 'Status') {
      }
    });
  }
  // peforming actions through api
  addProject(project_Data) {
    const request = {
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id,
      desc: project_Data.desc,
      id: 0,
      status: false
    };
    this.projectService.addProject(request).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data: any) => {
        request.id = data.project_id;
        this.dataSource.push(request);
        // this.dataSource.push(data);
        // this.getProjectList();
        this.router.navigate(['project', data['project_id'], 'stages']);
      },
      (error) => { }
    );
  }

  editProject(project_Data) {
    const request = {
      project_id: project_Data.id,
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id,
      desc: project_Data.desc
    };
    this.projectService.editProject(request).subscribe(
      (data) => {
        const currentProject = this.dataSource.find(x => x.id === project_Data.id);
        const projectIndex = this.dataSource.indexOf(currentProject);
        this.dataSource[projectIndex] = project_Data;
      },
      (error) => { }
    );
  }

  getProjectList() {
    this.loading = true;
    this.projectService.getProjectList().subscribe(
      (data) => {
        this.dataSource = data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  deleteProjectt(project_Data, index) {
    // this.dataSource.splice(index, 1);
    this.projectService.deleteProject(project_Data.id).subscribe(
      (data) => {
        // this.getProjectList();
        const currentProject = this.dataSource.find(x => x.id === project_Data.id);
        const projectIndex = this.dataSource.indexOf(currentProject);
        this.dataSource.splice(projectIndex, 1);
      },
      (error) => { }
    );
  }
  shareProjectModel(pid) {
    const dialogRef = this.dialog.open(ShareProjectComponent, {
      width: '650px',
      data: { project_id: pid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.event === 'Share') {
        const email = result.data.usernames.toString();
        const data = {
          usernames: email,
          project_id: result.data.project_id,
          subject: result.data.subject,
          message: result.data.message
        };
        console.log(data);
        this.projectService.sharedProjectViaMail(data).subscribe(
          () => { },
          (error) => { }
        );
      }
    });
  }

}
