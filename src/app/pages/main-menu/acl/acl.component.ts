import { BakcEndService } from '@/bakc-end.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.scss']
})
export class ACLComponent implements OnInit {

  constructor(private service: BakcEndService, private fb: FormBuilder, private toastr:ToastrService, private router: Router) {

  }
  groupForm: FormGroup
  group_settings: any;
  user_logs: [];
  selectedGroup: any = 'null';

  ngAfterViewInit(){
      // Accessing individual elements using array indexing

  }

  ngOnInit(): void {
    this.initGroupForm();
    this.fetchUserGroups();
  }

  fetchUserGroups(){
    this.service.group_settings().subscribe((data: any) => {
      this.group_settings = data.rows;
    });
  }

  selectGroup(row): void{
    this.initGroupForm();
    this.selectedGroup = row;
    this.patchValues();
  }

  initGroupForm(){
    this.groupForm = this.fb.group({
      dashboard:[false],
      profile:[false],
      file_201:[false],
      humanResource:[false],
      leaves:[false],  
      recruitment:[false],  
      settings:[false],

      employeeProfile: [false],
      plantilla: [false],
      serviceRecords: [false],
      discipline: [false],
      medical: [false],
      appointments: [false],
      
      reports: [false],
      announcements: [false],
      certifications: [false],
      templates: [false],
      evaluations: [false],
      actions: [false],
      
      leaveApproval: [false],
      leaveCredits: [false],
      leaveSettings: [false],

      application: [false],
      jobOpenings: [false],
      requiredDocs: [false],

      userRoles: [false],
      tlogs: [false],
      acl: [false],
      positions: [false],
      institutions: [false],
    });
  }

  patchValues(){
    if(this.selectedGroup != null && this.selectedGroup != "null" ){
      let group = this.group_settings.find(x=> x.doc['_id'] == this.selectedGroup)
      if (group.doc.hasOwnProperty('permissions')) {
        let permissions = group.doc.permissions
        if(Object.keys(permissions).length != 0) this.groupForm.patchValue(permissions);
      }
    } 
  }

  updatePermissions(row){
    let group = this.group_settings.find(x=> x.doc['_id'] == this.selectedGroup).doc
    
    if(group.hasOwnProperty('permissions')) group['permissions'] = {}
    group.permissions = row;

    this.service.updateUserGroup(group, group._id).subscribe(
      (response: any) => {
        this.toastr.success('User Group permissions updated.')
        this.fetchUserGroups()
        this.selectedGroup = 'null'
      }),
      (error) => {
        this.toastr.error(error.error.reason)
      }
  }

  //tickbox changes
  file201Change(){
    const file201Control = this.groupForm.get('file_201');
    const nestedControls = [
      'employeeProfile',
      'plantilla',
      'serviceRecords',
      'discipline',
      'medical',
      'appointments'
    ];

    if (file201Control.value){
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(true);
      });
    } else {
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(false);
      });
    }
  }
  file201sub(){
    const checkboxes = [
      this.groupForm.get('employeeProfile'),
      this.groupForm.get('plantilla'),
      this.groupForm.get('serviceRecords'),
      this.groupForm.get('discipline'),
      this.groupForm.get('medical'),
      this.groupForm.get('appointments'),
    ];
  
    const allFalse = checkboxes.every(checkbox => !checkbox.value);
    if (allFalse) this.groupForm.get('file_201').setValue(false);
  }

  humanResourceChange(){
    const humanResourceControl = this.groupForm.get('humanResource');
    const nestedControls = [
      'reports',
      'announcements',
      'certifications',
      'templates',
      'evaluations',
      'actions'
    ];

    if (humanResourceControl.value){
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(true);
      });
    } else {
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(false);
      });
    }
  }
  humanResourcesub(){
    const checkboxes = [
      this.groupForm.get('reports'),
      this.groupForm.get('announcements'),
      this.groupForm.get('certifications'),
      this.groupForm.get('templates'),
      this.groupForm.get('evaluations'),
      this.groupForm.get('actions'),
    ];
  
    const allFalse = checkboxes.every(checkbox => !checkbox.value);
    if (allFalse) this.groupForm.get('humanResource').setValue(false);

  }

  leavesChange(){
    const humanResourceControl = this.groupForm.get('leaves');
    const nestedControls = [
      'leaveApproval',
      'leaveCredits',
      'leaveSettings',
    ];

    if (humanResourceControl.value){
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(true);
      });
    } else {
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(false);
      });
    }
  }
  leavessub(){
    const checkboxes = [
      this.groupForm.get('leaveApproval'),
      this.groupForm.get('leaveCredits'),
      this.groupForm.get('leaveSettings')
    ];
  
    const allFalse = checkboxes.every(checkbox => !checkbox.value);
    if (allFalse) this.groupForm.get('leaves').setValue(false);
  }

  recruitmentChange(){
    const humanResourceControl = this.groupForm.get('recruitment');
    const nestedControls = [
      'application',
      'jobOpenings',
      'requiredDocs',
    ];

    if (humanResourceControl.value){
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(true);
      });
    } else {
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(false);
      });
    }
  }
  recruitmentsub(){
    const checkboxes = [
      this.groupForm.get('application'),
      this.groupForm.get('jobOpenings'),
      this.groupForm.get('requiredDocs')
    ];
  
    const allFalse = checkboxes.every(checkbox => !checkbox.value);
    if (allFalse) this.groupForm.get('recruitment').setValue(false);
  }


  settingsChange(){
    const humanResourceControl = this.groupForm.get('settings');
    const nestedControls = [
      'userRoles',
      'tlogs',
      'acl',
      'positions',
      'institutions'
    ];

    if (humanResourceControl.value){
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(true);
      });
    } else {
      nestedControls.forEach(controlName => {
        const control = this.groupForm.get(controlName);
        control.setValue(false);
      });
    }
  }
  settingssub(){
    const checkboxes = [
      this.groupForm.get('userRoles'),
      this.groupForm.get('tlogs'),
      this.groupForm.get('acl'),
      this.groupForm.get('positions'),
      this.groupForm.get('institutions'),
    ];
  
    const allFalse = checkboxes.every(checkbox => !checkbox.value);
    if (allFalse) this.groupForm.get('settings').setValue(false);
  }

  //in form buttons
  selectAllCheckBoxes(): void { this.groupForm.patchValue(createValueArray())}
  unselectAllCheckBoxes(): void {this.groupForm.reset()}
  disableSubModules(type) { return !this.groupForm.get(type).value}
}

function createValueArray(){
  return {
    dashboard: true,
    profile:true,
    file_201: true,
    humanResource:true,
    recruitment:true,  
    leaves:true,  
    settings:true,

    employeeProfile: true,
    plantilla: true,
    serviceRecords: true,
    discipline: true,
    medical: true,
    appointments: true,
    
    reports: true,
    announcements: true,
    certifications: true,
    templates: true,
    evaluations: true,
    actions: true,
    
    leaveApproval: true,
    leaveCredits: true,
    leaveSettings: true,
  
    application: true,
    jobOpenings: true,
    requiredDocs: true,
  
    userRoles: true,
    tlogs: true,
    acl: true,
    positions: true,
    institutions: true
  }
}