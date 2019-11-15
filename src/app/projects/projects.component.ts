import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { BusinessComponent } from '../business/business.component';
import { BuData } from '../services/bu.service';
import { ProjectData, ProjectService } from '../services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { ShareProjectComponent } from './share-project/share-project.component';

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
      // console.log('checkk it here', result);
      // return false;
      if (result.event === 'Add') {
        // this.addProject(result.data);
        this.addProject(result.data);
      } else if (result.event === 'Update') {
        this.editProject(result.data);
      } else if (result.event === 'Delete') {
        // this.deleteProject(result.data);
        this.deleteProjectt(result.data, result.id);
      } else if (result.event === 'Share') {
        // this.shareProject(result.data);
      } else if (result.event === 'Status') {
        // this.chanegeStatus(result.data);
      }
    });
  }
  // peforming actions through api
  addProject(project_Data) {
    const data = {
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id,
      desc: project_Data.desc
    };


    this.projectService.addProject(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      (data) => {
        // this.dataSourcee.push(data);
        this.getProjectList();
      },
      (error) => { }
    );
  }

  editProject(project_Data) {
    const data = {
      project_id: project_Data.id,
      name: project_Data.name,
      bu_id: project_Data.bu_id,
      sub_bu_id: project_Data.sub_bu_id,
      desc: project_Data.desc
    };
    this.projectService.editProject(data).subscribe(
      () => {
        this.getProjectList();
      },
      (error) => { }
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
