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
import { AuthGuard } from './guards/auth.guard';
import { StagesComponent } from './stages/stages.component';
import { CheklistQuestionsComponent } from './checklist/cheklist-questions/cheklist-questions.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'project/:stageId', children: [
      {
        path: 'checklist',
        component: ChecklistComponent,
      },
      {
        path: 'project-preview',
        component: CheklistQuestionsComponent,
      },
      {
        path: 'checklist/:id',
        component: ChecklistComponent,
      },
    ]
  },
  {
    path: 'testcomponent',
    component: TestcomponentComponent
  },
  {
    path: '',
    component: AdminComponent, children: [
      {
        path: 'questions/:id',
        component: QuestionsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'project-report',
        component: ProjectReportsComponent,
      },
      {
        path: 'category-library',
        component: CategoryLibraryComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'project/:stageId', children: [
          {
            path: 'stages',
            component: StagesComponent,
          },
          {
            path: 'stage/:id', children: [
              {
                path: 'questions',
                component: QuestionsComponent,
              }
            ]
          },

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
