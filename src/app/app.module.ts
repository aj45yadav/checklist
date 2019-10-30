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

// social login imports
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'ng-social-login';
import { HttpClientModule } from '@angular/common/http';
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

const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('653219154305-bfmhmsosk2oe5jdot8afa790v4il24eu.apps.googleusercontent.com')
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    SocialLoginModule
  ],
  entryComponents: [TestDialogComponent, CreateCategoryComponent, CreateQuestionsComponent,
     ExistingCategoryComponent, BusinessComponent],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    TestServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
