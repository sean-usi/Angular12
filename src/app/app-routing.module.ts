import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { HrReportsComponent } from '@pages/human-resource/hr-reports/hr-reports.component';
import { HrAnnouncementsComponent } from '@pages/human-resource/hr-announcements/hr-announcements.component';
import { HrCertificationsComponent } from '@pages/human-resource/hr-certifications/hr-certifications.component';
import { HrTemplatesComponent } from '@pages/human-resource/hr-templates/hr-templates.component';
import { HrPerformanceEvalComponent } from '@pages/human-resource/hr-performance-eval/hr-performance-eval.component';
import { HrActionMoveComponent } from '@pages/human-resource/hr-action-move/hr-action-move.component';
import { HrAppointmentsComponent } from '@pages/human-resource/hr-appointments/hr-appointments.component';
import { LeaveApprovalComponent } from '@pages/leaves/leave-approval/leave-approval.component';
import { LeaveCreditsComponent } from '@pages/leaves/leave-credits/leave-credits.component';
import { LeaveSettingsComponent } from '@pages/leaves/leave-settings/leave-settings.component';
import { UserTLogsComponent } from '@pages/main-menu/user-tlogs/user-tlogs.component';
import { ACLComponent } from '@pages/main-menu/acl/acl.component';
import { PositionComponent } from '@pages/main-menu/position/position.component';
import { LeaveHistoryComponent } from '@pages/leaves/leave-credits/leave-history/leave-history.component';
import { InstitutionComponent } from '@pages/main-menu/institution/institution.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                data: { requiredPermission: 'profile' }
            },
            {
                path: 'blank',
                component: BlankComponent,
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent,
                data: { requiredPermission: 'userRoles' }
            },
            // {
            //     path: 'sub-menu-2',
            //     component: BlankComponent
            // },
            {
                path: 'HRReports',
                component: HrReportsComponent,
                data: { requiredPermission: 'reports' }
            },
            {
                path: 'HRAnnouncements',
                component: HrAnnouncementsComponent,
                data: { requiredPermission: 'announcements' }
            },
            {
                path: 'HRCertifications',
                component: HrCertificationsComponent,
                data: { requiredPermission: 'certifications' }
            },
            {
                path: 'HRTemplates',
                component: HrTemplatesComponent,
                data: { requiredPermission: 'templates' }
            },
            {
                path: 'HRPerformanceEvaluation',
                component: HrPerformanceEvalComponent,
                data: { requiredPermission: 'evaluations' }
            },
            {
                path: 'HRActionMovements',
                component: HrActionMoveComponent,
                data: { requiredPermission: 'actions' }
            },
            {
                path: 'HRAppointments',
                component: HrAppointmentsComponent,
                data: { requiredPermission: 'appointments' }
            },
            {
                path: '',
                component: DashboardComponent,
                data: { requiredPermission: 'dashboard' }
            },
            {
                path: 'LeaveApproval',
                component: LeaveApprovalComponent,
                data: { requiredPermission: 'leaveApproval' }
            },
            {
                path: 'LeaveCredits',
                component: LeaveCreditsComponent,
                data: { requiredPermission: 'leaveCredits' }
            },
            {
                path: 'LeaveHistory/:id',
                component: LeaveHistoryComponent,
                data: { requiredPermission: 'leaveCredits' }
            },
            {
                path: 'LeaveSettings',
                component: LeaveSettingsComponent,
                data: { requiredPermission: 'leaveSettings' }
            },
            {
                path: 'UserTLogs',
                component: UserTLogsComponent,
                data: { requiredPermission: 'tlogs' }
            },
            {
                path: 'ACL',
                component: ACLComponent,
                data: { requiredPermission: 'acl' }

            },
            {
                path: 'Positions',
                component: PositionComponent,
                data: { requiredPermission: 'positions' }
            },
            {
                path: 'Institution',
                component: InstitutionComponent,
                data: { requiredPermission: 'institutions' }

            },
            {
              path: 'the201File',
              loadChildren: () => import('./pages/the201-file/the201-file.module').then(m => m.The201FileModule),
              data: { requiredPermission: 'file_201' }
            },
            {
              path: 'recruitment',
              loadChildren: () => import('./pages/recruitment/recruitment.module').then(m => m.RecruitmentModule),
              data: { requiredPermission: 'recruitment' }
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
