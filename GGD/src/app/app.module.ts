import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { CookieService } from 'ngx-cookie-service';
import { MatDatepickerModule, MatNativeDateModule, MatFormField, MatFormFieldModule } from '@angular/material';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule , MatStepperModule , MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { FaqComponent } from './survey/faq/faq.component';
import { SignUpComponent } from './Admin/sign-up/sign-up.component';
import { AdminOverviewComponent } from './Admin/admin-overview/admin-overview.component';
import { AddProjectComponent } from './Admin/add-project/add-project.component';
import { InviteAdminComponent } from './Admin/invite-admin/invite-admin.component';
import { ProjectsOverviewComponent, ProjectDialog, EditProjectDialog } from './Admin/projects-overview/projects-overview.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { EntryPageComponent } from './survey/entry-page/entry-page.component';
import { RedirectComponent } from './survey/redirect/redirect.component';
import { PopUpQuestionFormComponent } from './survey/pop-up-question-form/pop-up-question-form.component';
import { StepbystepGuideComponent } from './survey/stepbystep-guide/stepbystep-guide.component';
import { BarchartComponent } from './survey/barchart/barchart.component';
import { AskPersonalInfoComponent } from './survey/ask-personal-info/ask-personal-info.component';
import { ThankYouMessageComponent } from './survey/thank-you-message/thank-you-message.component';
import { EmployeeOverviewComponent } from './Admin/employee-overview/employee-overview.component';
import {EmployeeDetailComponent} from './Admin/employee-detail/employee-detail.component';
import {QrcodeComponent} from './Admin/qrcode/qrcode.component';
import { AlladminsOverviewComponent } from './Admin/alladmins-overview/alladmins-overview.component';
import { AlladminsOverviewAddModalComponent } from './Admin/alladmins-overview-add-modal/alladmins-overview-add-modal.component';
import { NotLoggedComponent } from './Admin/not-logged/not-logged.component';
import { ResultComponent } from './Admin/result/result.component';
import {ResponsiveService} from './services/responsive.service';



@NgModule({

  declarations: [
    AppComponent,
    routingComponents,
    FaqComponent,
    SignUpComponent,
    AdminOverviewComponent,
    AddProjectComponent,
    InviteAdminComponent,
    ProjectsOverviewComponent,
    DashboardComponent,
    EntryPageComponent,
    routingComponents,
    FaqComponent,
    EntryPageComponent,
    RedirectComponent,
    PopUpQuestionFormComponent,
    StepbystepGuideComponent,
    PopUpQuestionFormComponent,
    BarchartComponent,
    AskPersonalInfoComponent,
    ThankYouMessageComponent,
    EmployeeOverviewComponent,
    EmployeeDetailComponent,
    ProjectDialog,
    EditProjectDialog,
    AlladminsOverviewAddModalComponent,
    AlladminsOverviewComponent,
    NotLoggedComponent,
    ResultComponent,
    QrcodeComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
    OverlayModule,
    AppRoutingModule,
    MatDialogModule,
    NgxQRCodeModule,
    HttpClientModule,
    MatDatepickerModule ,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,


  ],
  entryComponents: [PopUpQuestionFormComponent, ProjectDialog, EditProjectDialog, ProjectsOverviewComponent],
  providers: [CookieService, EditProjectDialog, ProjectsOverviewComponent, ResponsiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
