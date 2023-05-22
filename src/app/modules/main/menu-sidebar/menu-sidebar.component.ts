import { BakcEndService } from '@/bakc-end.service';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public display_user;
    public menu;
    public group_settings;

    constructor(
        private service: BakcEndService,
        private http: HttpClient,
        public appService: AppService,
        private store: Store<AppState>,
        private toastr:ToastrService,
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });

        this.service.getSystemUser().subscribe((data: any) => { 
            this.display_user = data['rows'][0].doc.email
        });
        this.service.group_settings().subscribe((data: any) => {
            this.group_settings = data.rows;
        });
        
        this.user = this.appService.user;
        this.menu = defaultUser

        this.getUserMenu();
    }
    getUserMenu(){
        this.service.getSystemUser().subscribe((response: any) => { 
                if(response['rows'].length){
                    let group = this.group_settings.find(x=> x.doc['_id'] == response['rows'][0].doc?.setting_id)

                    if(group){
                        console.log('USER GROUP: ', group.doc.group_name)
                        if(group.doc.hasOwnProperty('permissions')){
                            let permissions = group.doc.permissions
                            const filteredMenu = MENU.filter(item => {
                                // Check if the item's ref_id exists in the permissions object and its value is true
                                return permissions[item.ref_id] === true;
                            });
        
                            const filterChildren = (parent) => {
                                if (parent.children) {
                                parent.children = parent.children.filter(child => {
                                    // Check if the child's ref_id exists in the permissions object and its value is true
                                    return permissions[child.ref_id] === true;
                                });
                            
                                // Recursively filter the children's children
                                parent.children.forEach(filterChildren);
                                }
                            };
        
                            filteredMenu.forEach(filterChildren);
                            this.menu = filteredMenu
    
                        } else this.toastr.warning("Error fetching group role settings. User has limited access");
                    } else this.toastr.warning("No user group. User has limited access");
                } else this.appService.logout();
            },
            (error) => {
              console.log(error.error.reason)
              this.toastr.error("Error fetching user and role settings.")
        });
    }
}

//automatically if user belongs to non-existenting or do not have a user group.
//only allows dashboard
export const defaultUser =  [
    {
      ref_id: "dashboard",
      name: "Dashboard",
      iconClasses: "fas fa-tachometer-alt",
      path: ["/"]
    }
  ]

  export const MENU = [
    {
        ref_id: "dashboard",
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
        ref_id: "file_201",
        name: 'The 201 File',
        iconClasses: 'bi bi-file',
        children: [
            {
                ref_id: "employeeProfile",
                name: 'Employee Profile',
                iconClasses: 'bi bi-person',
                path: ['/the201File/employee-profile/false']
            },
            {
                ref_id: "plantilla",
                name: 'Plantilla',
                iconClasses: 'bi bi-list-columns',
                path: ['/the201File/plantilla']
            },
            {
                ref_id: "serviceRecords",
                name: 'Service Records',
                iconClasses: 'bi bi-card-list',
                path: ['/the201File/employee-profile/serviceRecords'],
            },
            {
                ref_id: "discipline",
                name: 'Discipline Management',
                iconClasses: 'bi bi-card-list',
                path: ['/the201File/employee-profile/disciplineManagement'],
            },
            {
                ref_id: "medical",
                name: 'Medical',
                iconClasses: 'bi bi-hospital',
                path: ['/the201File/medical'],
            },
            {
                ref_id: "appointments",
                name: 'Appointments',
                iconClasses: 'bi bi-calendar-fill',
                path: ['/HRAppointments']
            }
        ]
    },
    {
        ref_id: "humanResource",
        name: 'Human Resource',
        iconClasses: 'bi bi-person-square',
        children: [
            {
                ref_id: "reports",
                name: 'Reports',
                iconClasses: 'bi bi-printer-fill',
                path: ['/HRReports']
            },
            {
                ref_id: "announcements",
                name: 'Announcements',
                iconClasses: 'bi bi-megaphone-fill',
                path: ['/HRAnnouncements']
            },
            {
                ref_id: "certifications",
                name: 'Certifications',
                iconClasses: 'bi bi-award-fill',
                path: ['/HRCertifications']
            },
            {
                ref_id: "templates",
                name: 'Templates',
                iconClasses: 'bi bi-diagram-3-fill',
                path: ['/HRTemplates']
            },
            {
                ref_id: "evaluations",
                name: 'Performance Evaluation',
                iconClasses: 'bi bi-list-check',
                path: ['/HRPerformanceEvaluation']
            },
            // {
            //     ref_id: "actions",
            //     name: 'Action/Movements',
            //     iconClasses: 'bi bi-activity',
            //     path: ['/HRActionMovements']
            // }
        ]
    },
    {
        ref_id: "leaves",
        name: 'Leaves',
        iconClasses: 'bi bi-box-arrow-left',
        children: [
            {
                ref_id: "leaveApproval",
                name: 'Leave Approval',
                iconClasses: 'fas fa-file',
                path: ['/LeaveApproval']
            },
            {
                ref_id: "leaveCredits",
                name: 'Leave Credits',
                iconClasses: 'fas fa-file',
                path: ['/LeaveCredits']
            },
            {
                ref_id: "leaveSettings",
                name: 'Leave Settings',
                iconClasses: 'fas fa-cog',
                path: ['/LeaveSettings']
            }
        ]
    },
    {
        ref_id: "recruitment",
        name: 'Recruitment',
        iconClasses: 'bi bi-person',
        children: [
            {
                ref_id: "application",
                name: 'Application',
                iconClasses: 'fas fa-users',
                path: ['/recruitment/applications']
            },
            {
                ref_id: "jobOpenings",
                name: 'Job Openings',
                iconClasses: 'fas fa-box',
                path: ['/recruitment/job-openings']
            },
            {
                ref_id: "requiredDocs",
                name: 'Required Docs',
                iconClasses: 'fas fa-file',
                path: ['/recruitment/required-documents']
            },
        ]
    },
    {
        ref_id: "settings",
        name: 'Settings',
        iconClasses: 'fas fa-cog',
        children: [
            {
                ref_id: "userRoles",
                name: 'User Roles',
                iconClasses: 'fas fa-users',
                path: ['/sub-menu-1']
            },
            {
                ref_id: "tlogs",
                name: 'User T-Logs',
                iconClasses: 'fas fa-file',
                path: ['/UserTLogs']
            },
            {
                ref_id: "acl",
                name: 'ACL',
                iconClasses: 'fas fa-file',
                path: ['/ACL']
            },
            {
                ref_id: "positions",
                name: 'Positions',
                iconClasses: 'fas fa-file',
                path: ['/Positions']
            },
            {
                ref_id: "institutions",
                name: 'Institution',
                iconClasses: 'fas fa-file',
                path: ['/Institution']
            }
        ]
    },
]