import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
// import { BusinessComponent } from './business/business.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectReportsComponent } from './project-reports/project-reports.component';
import { CategoryLibraryComponent } from './category-library/category-library.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectsComponent } from './projects/projects.component';
// import { Checklist2Component } from './checklist2/checklist2.component';
import { AuthGuard } from './guards/auth.guard';
import { StagesComponent } from './stages/stages.component';
import { ChecklistNewComponent } from './checklist-new/checklist-new.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'project/:stageId', children: [
      {
        path: 'checklist',
        component: ChecklistComponent, canActivate: [AuthGuard]
      },
      {
        path: 'checklist/:id',
        component: ChecklistComponent, canActivate: [AuthGuard]
      },
      // {
      //   path: 'checklistt/:id',
      //   component: ChecklistComponent, canActivate: [AuthGuard]
      // },
    ]
  },

  // {
  //   path: 'checklist2/:id',
  //   component: Checklist2Component, canActivate: [AuthGuard]
  // },
  {
    path: 'checklist-new',
    component: ChecklistNewComponent
  },
  {
    path: 'testcomponent',
    component: TestcomponentComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AdminComponent, children: [
      // {
      //   path: 'business-unit',
      //   component: BusinessComponent
      // },
      {
        path: 'questions/:id',
        component: QuestionsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AuthGuard]
      },
      {
        path: 'project-report',
        component: ProjectReportsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'category-library',
        component: CategoryLibraryComponent, canActivate: [AuthGuard]
      },
      {
        path: 'projects',
        component: ProjectsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'project/:stageId', children: [
          // {
          //   path: 'questions',
          //   component: QuestionsComponent, canActivate: [AuthGuard]
          // },
          {
            path: 'stages',
            component: StagesComponent, canActivate: [AuthGuard],
          },
          {
            path: 'stage/:id', children: [
              {
                path: 'questions',
                component: QuestionsComponent, canActivate: [AuthGuard]
              }
            ]
          },
          // {
          //   path: 'checklist/:id',
          //   component: ChecklistComponent, canActivate: [AuthGuard]
          // },
        ]
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
