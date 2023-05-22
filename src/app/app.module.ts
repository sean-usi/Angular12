import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgPipesModule} from 'ngx-pipes';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';

import {DatePipe, registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import {ProfabricComponentsModule} from '@profabric/angular-components';
import {defineCustomElements} from '@profabric/web-components/loader';
import { SidebarSearchComponent } from './components/sidebar-search/sidebar-search.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BakcEndService } from './bakc-end.service';
import { HrReportsComponent } from './pages/human-resource/hr-reports/hr-reports.component';
import { HrAnnouncementsComponent } from './pages/human-resource/hr-announcements/hr-announcements.component';
import { HrCertificationsComponent } from './pages/human-resource/hr-certifications/hr-certifications.component';
import { HrTemplatesComponent } from './pages/human-resource/hr-templates/hr-templates.component';
import { HrPerformanceEvalComponent } from './pages/human-resource/hr-performance-eval/hr-performance-eval.component';
import { HrActionMoveComponent } from './pages/human-resource/hr-action-move/hr-action-move.component';
import { HrAppointmentsComponent } from './pages/human-resource/hr-appointments/hr-appointments.component';
import { LeaveSettingsComponent } from './pages/leaves/leave-settings/leave-settings.component';
import { LeaveApprovalComponent } from './pages/leaves/leave-approval/leave-approval.component';
import { LeaveCreditsComponent } from './pages/leaves/leave-credits/leave-credits.component';
import { DataTablesModule } from 'angular-datatables';
import { UserTLogsComponent } from './pages/main-menu/user-tlogs/user-tlogs.component';
import { ACLComponent } from './pages/main-menu/acl/acl.component';
import { PositionComponent } from './pages/main-menu/position/position.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeaveHistoryComponent } from './pages/leaves/leave-credits/leave-history/leave-history.component';
import { EvaluationCriteriaComponent } from './pages/human-resource/hr-templates/evaluation-criteria/evaluation-criteria.component';
import { EvaluationSubcriteriaComponent } from './pages/human-resource/hr-templates/evaluation-subcriteria/evaluation-subcriteria.component';
import { EmployeeRatingsComponent } from './pages/human-resource/hr-templates/employee-ratings/employee-ratings.component';
import { EvaluationTemplatesComponent } from './pages/human-resource/hr-templates/evaluation-templates/evaluation-templates.component';
import { SafePipe } from './pipe/safe.pipe';
import { InstitutionComponent } from './pages/main-menu/institution/institution.component';

defineCustomElements();
registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        ControlSidebarComponent,
        SidebarSearchComponent,
        HrReportsComponent,
        HrAnnouncementsComponent,
        HrCertificationsComponent,
        HrTemplatesComponent,
        HrPerformanceEvalComponent,
        HrActionMoveComponent,
        HrAppointmentsComponent,
        LeaveSettingsComponent,
        LeaveApprovalComponent,
        LeaveCreditsComponent,
        UserTLogsComponent,
        ACLComponent,
        PositionComponent,
        LeaveHistoryComponent,
        EvaluationCriteriaComponent,
        EvaluationSubcriteriaComponent,
        EmployeeRatingsComponent,
        EvaluationTemplatesComponent,
        SafePipe,
        InstitutionComponent
    ],
    imports: [
        BrowserModule,
        NgxSummernoteModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DataTablesModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ProfabricComponentsModule,
        MatTabsModule,
        MatTableModule,
        NgbModule,
        FormsModule,
        FullCalendarModule,
        MatExpansionModule,
        NgPipesModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
@Injectable({
    providedIn: BakcEndService,
  })
export class AppModule {}
