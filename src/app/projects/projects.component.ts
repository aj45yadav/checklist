import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { BusinessComponent } from '../business/business.component';
import { BuData } from '../services/bu.service';

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
  dataSource = ProjectData;

  @ViewChild(MatTable, {}) table: MatTable<any>;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
        this.updateProject(result.data);
      } else if (result.event === 'Delete') {
        this.deleteProject(result.data);
      } else if (result.event === 'Share') {
        this.shareProject(result.data);
      } else if (result.event === 'Status') {
        this.chanegeStatus(result.data);
      }
    });
  }

  addProject(project_Data) {
    let d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      businessUnit: project_Data.businessUnit,
      subBusinessUnit: project_Data.subBusinessUnit,
      projectName: project_Data.projectName
    });
  }
  updateProject(project_Data) {
    this.dataSource =  this.dataSource.filter((value, key) => {
      if (value.id === project_Data.id) {
        value.businessUnit = project_Data.businessUnit;
        value.subBusinessUnit = project_Data.subBusinessUnit;
        value.projectName = project_Data.projectName;
      }
      return true;
    });
  }
  deleteProject(project_Data) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== project_Data.id;
    });
  }
  shareProject(project_Data) {

  }
  chanegeStatus(project_Data) {

  }
}
