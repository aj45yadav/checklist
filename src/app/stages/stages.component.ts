import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { MatDialog } from '@angular/material';
import { StageDialogComponent } from './stage-dialog/stage-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {
  loading: boolean;
  projectId: number;
  projectStages;
  constructor(public projectService: ProjectService, public dialog: MatDialog, public activatedRoute: ActivatedRoute,
     private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params['stageId'];
    this.getStages();
  }
  openStageDialog(action, obj) {
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
    this.spinner.show();
    const request = {
      project_id: this.projectId
    };
    this.projectService.getStages(request).subscribe(
      (data: any) => {
        this.projectStages = data;
        // console.log(this.projectStages);
        this.spinner.hide();
      },
      (error) => {
        this.loading = false;
        this.spinner.hide();
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
      (data: any) => {
        const newStage = {
          id: data.stage_id,
          name: stage.name
        };
        this.projectStages.stages.push(newStage);
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
        // this.getStages();
        const currentStage = this.projectStages.stages.find(x => x.id === stage.id);
        const stageIndex = this.projectStages.stages.indexOf(currentStage);
        this.projectStages.stages[stageIndex] = stage;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteStage(stage) {
    this.projectService.deleteStage(stage.id).subscribe(
      (data) => {
        const currentStage = this.projectStages.stages.find(x => x.id === stage.id);
        const stageIndex = this.projectStages.stages.indexOf(currentStage);
        this.projectStages.stages.splice(stageIndex, 1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
