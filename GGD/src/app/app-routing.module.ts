import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { QuestionFormComponent } from './survey/question-form/question-form.component';
import { HomeScreenComponent } from './survey/home-screen/home-screen.component';
import { AdminScreenComponent} from './Admin/admin-screen/admin-screen.component';
import {FaqComponent} from './survey/faq/faq.component';
import { EntryPageComponent } from './survey/entry-page/entry-page.component';
import { RedirectComponent } from './survey/redirect/redirect.component';
import { StepbystepGuideComponent} from "./survey/stepbystep-guide/stepbystep-guide.component";
import { BarchartComponent } from './survey/barchart/barchart.component';
import { AskPersonalInfoComponent } from './survey/ask-personal-info/ask-personal-info.component';
import { ThankYouMessageComponent } from './survey/thank-you-message/thank-you-message.component';
import {SignUpComponent} from './Admin/sign-up/sign-up.component'
import { from } from 'rxjs';
import {AdminOverviewComponent} from './Admin/admin-overview/admin-overview.component'
import {InviteAdminComponent} from './Admin/invite-admin/invite-admin.component'
import {DashboardComponent} from "./Admin/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: EntryPageComponent},
  { path: 'redirect', component: RedirectComponent},
  { path: 'redirect/:code', component: RedirectComponent},
  { path: 'home', component: HomeScreenComponent},
  { path: 'survey', component: QuestionFormComponent},
  { path: 'admin', component: AdminScreenComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'admin-overview' , component: AdminOverviewComponent , children: [{
    path: 'cancel', component: AdminOverviewComponent
    }]},
  { path: 'faq', component: FaqComponent},
  {path: 'invite' , component: InviteAdminComponent},
  { path: 'stepbystep', component: StepbystepGuideComponent},
  { path: 'result', component: BarchartComponent},    // component with the barchart
  { path: 'ask', component: AskPersonalInfoComponent}, // component that asks for personal information
  { path: 'thank-you', component: ThankYouMessageComponent},
  {path: 'Dashboard' , component: DashboardComponent}// component that asks for personal information

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [
  HomeScreenComponent,
  QuestionFormComponent,
  AdminScreenComponent,
  FaqComponent,
  RedirectComponent,
  StepbystepGuideComponent,
];
