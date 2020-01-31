import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusinessComponent } from './business/business.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { TestcomponentComponent } from './testcomponent/testcomponent.component';
import { MaterialModule } from 'src/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

// social login imports
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'ng-social-login';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { QuestionsComponent } from './questions/questions.component';
import { CreateCategoryComponent } from './questions/create-category/create-category.component';
import { CreateQuestionsComponent } from './questions/create-questions/create-questions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectReportsComponent } from './project-reports/project-reports.component';
import { CategoryLibraryComponent } from './category-library/category-library.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserComponent } from './layouts/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExistingCategoryComponent } from './questions/existing-category/existing-category.component';
import { SubQuestionsPipe } from './pipes/sub-questions.pipe';
import { MainQuestionsPipe } from './pipes/main-questions.pipe';
import { TestDialogComponent } from './testcomponent/test-dialog/test-dialog.component';
import { TestServiceService } from './services/test-service.service';
import { ProjectsComponent } from './projects/projects.component';
import { AuthService } from './services/auth.service';
import { ProjectService } from './services/project.service';
import { ShareProjectComponent } from './projects/share-project/share-project.component';
import { DocTypeContentComponent } from './checklist/doc-type-content/doc-type-content.component';
import { StagesComponent } from './stages/stages.component';
import { StageDialogComponent } from './stages/stage-dialog/stage-dialog.component';
import { CatGrpDialogComponent } from './questions/cat-grp-dialog/cat-grp-dialog.component';
import { CheklistQuestionsComponent } from './checklist/cheklist-questions/cheklist-questions.component';
import { AuthInterceptorService } from './guards/auth-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';

const CONFIG = new AuthServiceConfig([
  // provide google Id to do client side authentications
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  },
  {
    id: LinkedinLoginProvider.PROVIDER_ID,
    provider: new LinkedinLoginProvider('LINKEDIN_CLIENT_ID')
  }
]);

export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    BusinessComponent,
    ChecklistComponent,
    TestcomponentComponent,
    LoginComponent,
    HeaderComponent,
    QuestionsComponent,
    CreateCategoryComponent,
    CreateQuestionsComponent,
    DashboardComponent,
    ProjectReportsComponent,
    CategoryLibraryComponent,
    AdminComponent,
    UserComponent,
    PageNotFoundComponent,
    ExistingCategoryComponent,
    SubQuestionsPipe,
    MainQuestionsPipe,
    TestDialogComponent,
    ProjectsComponent,
    ShareProjectComponent,
    DocTypeContentComponent,
    StagesComponent,
    StageDialogComponent,
    CatGrpDialogComponent,
    CheklistQuestionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    SocialLoginModule,
    NgxSpinnerModule,
  ],
  entryComponents: [TestDialogComponent, CreateCategoryComponent, CreateQuestionsComponent,
     ExistingCategoryComponent, BusinessComponent, ShareProjectComponent, DocTypeContentComponent, StageDialogComponent,
      CatGrpDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    TestServiceService, AuthService, ProjectService, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
