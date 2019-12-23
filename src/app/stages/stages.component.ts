import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { MatDialog } from '@angular/material';
import { StageDialogComponent } from './stage-dialog/stage-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {
  loading: boolean;
  projectId: number;
  projectStages;
  constructor(public projectService: ProjectService, public dialog: MatDialog, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['id'];
    this.getStages();
  }
  openStageDialog(action , obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(StageDialogComponent, {
      width: '650px',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addStage(result.data);
      } else if (result.event === 'Update') {
        this.editStage(result.data);
      } else if (result.event === 'Delete') {
        this.deleteStage(result.data);
      }
    });
  }
  getStages() {
    this.loading = true;
    const request = {
      project_id: this.projectId
    };
    this.projectService.getStages(request).subscribe(
      (data: any) => {
        this.projectStages = data;
        // console.log(this.stages);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  addStage(stage) {
    this.loading = true;
    const request = {
      project_id: this.projectId,
      name: stage.name
    };
    this.projectService.addStages(request).subscribe(
      (data) => {
        this.projectStages.push(request);
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }
  editStage(stage) {
    const request = {
      stage_id: stage.id,
      name: stage.name
    };
    this.projectService.editStage(request).subscribe(
      (data) => {
        this.getStages();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteStage(stage) {
    this.projectService.deleteStage(stage.id).subscribe(
      () => {
        this.getStages();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
