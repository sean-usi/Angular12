import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BakcEndService } from '@/bakc-end.service';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})


export class SubMenuComponent implements OnInit{
  ads: any;
  list: any;
  createForm!: FormGroup;
  dashboard: any;
  id: any;
  rev: any;
  display: any;
  editForm!: FormGroup;
  advanceForm!: FormGroup;
  public menu = MENU;
  dashboardArray!: any;
  fileArray!: any;
  profileArray!: any;
  perInfoArray!: any;
  familyArray!: any;
  educationArray!: any;
  jobArray!: any;
  civilArray!: any;
  workArray!: any;
  trainArray!: any;
  otherArray!: any;
  serviceArray!: any;
  attArray!: any;
  docArray!: any;
  taskArray!: any;
  healthArray!: any;
  discArray!: any;
  masterArray!: any;
  servRecArray!: any;
  disciplineArray!: any;
  clinicArray!: any;
  reportsArray!: any;
  users: any;
  dtOptions: any;
  form: any;
  editUserForm: any;

  constructor(private backService: BakcEndService, private fb: FormBuilder, private router: Router, private modalService: NgbModal, private toastr: ToastrService) { 

    this.form = fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      retypePassword: [null, Validators.required],
      contact: [null, [Validators.pattern('[0-9 ]*')]],
      designation: [null, Validators.required],
      setting_id: [null, Validators.required],
      isActive: [true],
    })

    this.editUserForm = fb.group({
      _id: [null],
      _rev: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      middleName: [null],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [null, Validators.required],
      retypePassword: [null, Validators.required],
      contact: [null, [Validators.pattern('[0-9 ]*')]],
      designation: [null, Validators.required],
      setting_id: [null, Validators.required],
      isActive: [true],
    })
  }

  onChange(name: string, isChecked: boolean) {
    const dashboard = (this.advanceForm.controls.name as FormArray);

    if (isChecked) {
      dashboard.push(new FormControl(name));
    } else {
      const index = dashboard.controls.findIndex(x => x.value === name);
      dashboard.removeAt(index);
    }
  }

  ngOnInit(): void {
    this.backService.advanceFunc().subscribe((data:any) => {
      this.ads = data.rows;
      console.log("Display", this.ads);

      var dash = this.ads;
      console.log(dash.length);

      var array1:any[] = [];
      var array2:any[] = [];
      var array3:any[] = [];
      var array4:any[] = [];
      var array5:any[] = [];
      var array6:any[] = [];
      var array7:any[] = [];
      var array8:any[] = [];
      var array9:any[] = [];
      var array10:any[] = [];
      var array11:any[] = [];
      var array12:any[] = [];
      var array13:any[] = [];
      var array14:any[] = [];
      var array15:any[] = [];
      var array16:any[] = [];
      var array17:any[] = [];
      var array18:any[] = [];
      var array19:any[] = [];
      var array20:any[] = [];
      var array21:any[] = [];
      var array22:any[] = [];


      for(let i = 0; i < dash.length; i++) {
        for(let j = 0; j < dash[i].doc.dashboard.length; j++) {
          var da = dash[i].doc.dashboard[j];
          var dashObj = {dashboard: da.dashboard, privilage: da.privilage, refId: da.refId};
          // console.log(dashObj);
          array1.push(dashObj)
        }

        for(let e = 0; e < dash[i].doc.File.length; e++) {
          var file = dash[i].doc.File[e];
          var fileObj = {File: file.File, privilage: file.privilage, refId: file.refId};
          // console.log(fileObj);
          array2.push(fileObj)
        }

      for(let p = 0; p < dash[i].doc.employeeProfile.length; p++) {
          var emp = dash[p].doc.employeeProfile[p];
          var profObj = {employeeProfile: emp.employeeProfile, privilage: emp.privilage, refId: emp.refId};
          // console.log(profObj);
          array3.push(profObj)
        }

      for(let q = 0; q < dash[i].doc.personalInformation.length; q++) {
          var pi = dash[q].doc.personalInformation[q];
          var pinfoObj = {personalInformation: pi.personalInformation, privilage: pi.privilage, refId: pi.refId};
          // console.log(pinfoObj);
          array4.push(pinfoObj)
        }

      for(let f = 0; f < dash[i].doc.familyMembers.length; f++) {
          var fam = dash[f].doc.familyMembers[f];
          var famMemObj = {familyMembers: fam.familyMembers, privilage: fam.privilage, refId: fam.refId};
          console.log(famMemObj);
          array5.push(famMemObj)
        }

      for(let ed = 0; ed < dash[i].doc.educationalAttainment.length; ed++) {
          var edu = dash[ed].doc.educationalAttainment[ed];
          var eduAttObj = {educationalAttainment: edu.educationalAttainment, privilage: edu.privilage, refId: edu.refId};
          console.log(eduAttObj);
          array6.push(eduAttObj)
        }

      for(let jo = 0; jo < dash[i].doc.jobExperience.length; jo++) {
          var job = dash[jo].doc.jobExperience[jo];
          var jobObj = {jobExperience: job.jobExperience, privilage: job.privilage, refId: job.refId};
          console.log(jobObj);
          array7.push(jobObj)
        }

        for(let c = 0; c < dash[i].doc.civilService.length; c++) {
          var civil = dash[c].doc.civilService[c];
          var civilObj = {civilService: civil.civilService, privilage: civil.privilage, refId: civil.refId};
          console.log(civilObj);
          array8.push(civilObj)
        }

        for(let w = 0; w < dash[i].doc.workEnvolvement.length; w++) {
          var work = dash[w].doc.workEnvolvement[w];
          var workObj = {workEnvolvement: work.workEnvolvement, privilage: work.privilage, refId: work.refId};
          console.log(workObj);
          array9.push(workObj)
        }

        for(let t = 0; t < dash[i].doc.trainings.length; t++) {
          var train = dash[t].doc.trainings[t];
          var trainObj = {trainings: train.trainings, privilage: train.privilage, refId: train.refId};
          console.log(trainObj);
          array10.push(trainObj)
        }

        for(let o = 0; o < dash[i].doc.others.length; o++) {
          var other = dash[o].doc.others[o];
          var otherObj = {others: other.others, privilage: other.privilage, refId: other.refId};
          console.log(otherObj);
          array11.push(otherObj)
        }

        for(let se = 0; se < dash[i].doc.serviceInformation.length; se++) {
          var service = dash[se].doc.serviceInformation[se];
          var serviceObj = {serviceInformation: service.serviceInformation, privilage: service.privilage, refId: service.refId};
          console.log(serviceObj);
          array12.push(serviceObj)
        }

        for(let at = 0; at < dash[i].doc.attendance.length; at++) {
          var att = dash[at].doc.attendance[at];
          var attObj = {attendance: att.attendance, privilage: att.privilage, refId: att.refId};
          console.log(attObj);
          array13.push(attObj)
        }

        for(let docs = 0; docs < dash[i].doc.documents.length; docs++) {
          var docu = dash[docs].doc.documents[docs];
          var docuObj = {documents: docu.documents, privilage: docu.privilage, refId: docu.refId};
          console.log(docuObj);
          array14.push(docuObj)
        }

        for(let ta = 0; ta < dash[i].doc.task.length; ta++) {
          var task = dash[ta].doc.task[ta];
          var taskObj = {task: task.task, privilage: task.privilage, refId: task.refId};
          console.log(taskObj);
          array15.push(taskObj)
        }

        for(let h = 0; h < dash[i].doc.healthRecords.length; h++) {
          var health = dash[h].doc.healthRecords[h];
          var healthObj = {healthRecords: health.healthRecords, privilage: health.privilage, refId: health.refId};
          console.log(healthObj);
          array16.push(healthObj)
        }

        for(let di = 0; di < dash[i].doc.disciplineManagement.length; di++) {
          var disc = dash[di].doc.disciplineManagement[di];
          var discObj = {disciplineManagement: disc.disciplineManagement, privilage: disc.privilage, refId: disc.refId};
          console.log(discObj);
          array17.push(discObj)
        }

        for(let mas = 0; mas < dash[i].doc.masterList.length; mas++) {
          var master = dash[mas].doc.masterList[mas];
          var masterObj = {masterList: master.masterList, privilage: master.privilage, refId: master.refId};
          console.log(masterObj);
          array18.push(masterObj)
        }

        for(let srv = 0; srv < dash[i].doc.serviceRecords.length; srv++) {
          var srvs = dash[srv].doc.serviceRecords[srv];
          var srvsObj = {serviceRecords: srvs.serviceRecords, privilage: srvs.privilage, refId: srvs.refId};
          console.log(srvsObj);
          array19.push(srvsObj)
        }

        for(let dsp = 0; dsp < dash[i].doc.discipline_management.length; dsp++) {
          var dsps = dash[dsp].doc.discipline_management[dsp];
          var dspsObj = {discipline_management: dsps.discipline_management, privilage: dsps.privilage, refId: dsps.refId};
          console.log(dspsObj);
          array20.push(dspsObj)
        }

        for(let cl = 0; cl < dash[i].doc.clinic.length; cl++) {
          var clnc = dash[cl].doc.clinic[cl];
          var clncObj = {clinic: clnc.clinic, privilage: clnc.privilage, refId: clnc.refId};
          console.log(clncObj);
          array21.push(clncObj)
        }

        for(let rep = 0; rep < dash[i].doc.reports.length; rep++) {
          var reps = dash[rep].doc.reports[rep];
          var repsObj = {reports: reps.reports, privilage: reps.privilage, refId: reps.refId};
          console.log(repsObj);
          array22.push(repsObj)
        }

      }

      this.dashboardArray = array1;
      this.fileArray = array2;
      this.profileArray = array3;
      this.perInfoArray = array4;
      this.familyArray = array5;
      this.educationArray = array6;
      this.jobArray = array7;
      this.civilArray = array8;
      this.workArray = array9;
      this.trainArray = array10;
      this.otherArray = array11;
      this.serviceArray = array12;
      this.attArray = array13;
      this.docArray = array14;
      this.taskArray = array15;
      this.healthArray = array16;
      this.discArray = array17;
      this.masterArray = array18;
      this.servRecArray = array19;
      this.disciplineArray = array20;
      this.clinicArray = array21;
      this.reportsArray = array22;

  });
  this.getUsers()
  this.getGroups()
  
  this.createForm = new FormGroup({
    number: new FormControl("",),
    group_id: new FormControl("", [Validators.required]),
    group_name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    inactive: new FormControl(""),
    permissions: new FormControl(""),
  });

  this.editForm = new FormGroup({
    group_id: new FormControl("", [Validators.required]),
    group_name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    inactive: new FormControl(""),
    permissions: new FormControl(""),
  });
  this.advanceForm = this.fb.group({
    dashboard: this.fb.array([]),
  });
  }
  createGroup() {
    const group_id = this.createForm.value.group_id;
    const group_name = this.createForm.value.group_name;
    const description = this.createForm.value.description;
    const inactive = this.createForm.value.inactive ? '1' : '0';
    const permissions = this.createForm.value.permissions = permissionDefault()
    const postObject = {group_id: group_id, group_name: group_name, description: description, inactive: inactive, permissions:permissions}
    this.backService.addUserGroup(postObject).subscribe(data => {
      console.log("Warning",data);
      Swal.fire('Success!', 'The group has been Created!', 'success')
      this.createForm.reset()
      this.getGroups()
  
    });
  }

  getGroups(){
    this.backService.users().subscribe((data:any) => {
      console.log(data);
      this.list = data.rows;
      this.dtOptions = {
        language: {
          search: '',
          searchPlaceholder: 'Search',
          lengthMenu: 'Show _MENU_ entries'
        },
        pageLength: 5,
        ordering: false,
        paging: true,
        dom: 'Bfrtip',
        buttons: [
          {extend: 'print', exportOptions:{ columns: 'thead th:not(.noExport)' }},
          {extend: 'copyHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
          {extend: 'csvHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
          {extend: 'excelHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
        ]
      }

      console.log("Display", this.list);
    });
  }
  deleteGroup(id: any, rev: any) {
    this.backService.removeUserGroup(id, rev).subscribe(data => {
      console.log(data);
      Swal.fire('Success!', 'The group has been Deleted!', 'success')
      .then((result) => {
        this.getGroups()
      })
    });
  }
  editGroup() {
  const group_id = this.editForm.value.group_id;
  const inactive = this.editForm.value.inactive ? '1' : '0';
  const group_name = this.editForm.value.group_name;
  const description = this.editForm.value.description;
  const permissions = this.editForm.value.permissions;
  const updObject = {_id: this.id, 
    _rev: this.rev,
    group_id: group_id,
    inactive: inactive,
    group_name: group_name,
    description: description,
    permissions:permissions
  }
  this.backService.updateUserGroup(updObject, this.id).subscribe(data => {
    console.log(data);
    Swal.fire('Success!', 'The group has been Updated!', 'success')
      .then((result) => {
        this.getGroups()
      })
  });
}
toArray(File: object) {
return Object.keys(File).map(key => File[key])
}


open(data: any) {
  this.editForm.controls["group_id"].setValue(data.group_id)
  this.editForm.controls["inactive"].setValue(data.inactive == 1 ? true : false)
  this.editForm.controls["group_name"].setValue(data.group_name)
  this.editForm.controls["description"].setValue(data.description)
  this.editForm.controls["permissions"].setValue(data.permissions)
  this.id = data._id;
  this.rev = data._rev;
  console.log(this.editForm.value)
}

openModal(content) {
    this.modalService.open(content, { backdrop: false, centered: true, size: 'lg' })
  }
del(doc: any){
  this.id = doc._id;
  this.rev = doc._rev;
}
refresh() {
  this.router.navigate(['sub-menu-1']);
}

refreshGroupList(){
  this.backService.group_settings().subscribe((data:any) => {
    console.log(data);
    this.list = data.rows;
});
}

submitJobOpening(){

}

get f() {
  return this.form
}

dismiss() {
  // this.f.removeControl('_id')
  // this.f.removeControl('_rev')
  this.modalService.dismissAll()
}

getUsers() {

  this.backService.allUsers().subscribe((data: any) => {
    this.users = data.rows
  },
  (error) => {
    this.toastr.error(error.error.reason)
  }
  )
  this.backService.allUsers().subscribe(
    (response: any) => {
      this.users = response?.rows
      // this.getJobOpenings()
    },
    (error) => {
      this.toastr.error(error.error.reason)
    }
  )
}

saveUser(){
  if(this.form.valid){
    if(this.form.get('password').value != this.form.get('retypePassword').value){
      this.toastr.error("Passwords does not match.")
    }
    else{
      this.backService.addUser(this.form.value).subscribe(data => {
        console.log("Warning",data);
        Swal.fire('Success!', 'New user has been added', 'success')
        .then((result) => {
          this.getUsers()
          this.f.reset()
          this.dismiss()
        })
    
      });
    }
  }
  else{
    this.form.markAllAsTouched()
  }
}

updateUser(id){
  if(this.editUserForm.valid){
    if(this.editUserForm.get('password').value != this.editUserForm.get('retypePassword').value){
      this.toastr.error("Passwords does not match.")
    }
    else{
      this.backService.editUser(this.editUserForm.value, id).subscribe(data => {
        console.log("Warning",data);
        Swal.fire('Success!', 'User has been updated', 'success')
        .then((result) => {
          this.getUsers()
          this.dismiss()
        })
    
      });
    }
  }
  else{
    this.editUserForm.markAllAsTouched()
  }
}

deleteUser(id, rev){
  Swal.fire({
    icon: 'info',
    title: 'Do you want to delete this user?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      this.backService.deleteUser(id, rev).subscribe(
        (response: any) => {
          Swal.fire('Deleted!', '', 'success')
          this.getUsers()
        },
        (error) => {
          this.toastr.error(error.error.reason)
        }
      )
    }
  });
}


editUser(content, data) {
  this.editUserForm.reset()
  this.editUserForm.patchValue(data)
  console.log(this.editUserForm)
  this.openModal(content)
}

getGroupName(id){
  var data = this.list.find((l) => l.id == id)
  if(data){
    return data.doc.group_name
  }
  else{
    return id
  }
}

}
export const MENU = [
  
  {
      name: 'Groups',
      iconClasses: 'bi bi-collection-fill',        
      children: [
          {
              name: 'Administrators',
              iconClasses: 'fas fa-users',
          },
          {
              name: 'Human Resource',
              iconClasses: 'fas fa-users',
              path: ['/HRAnnouncements']
          },
          {
              name: 'Accounting',
              iconClasses: 'fas fa-users',
              path: ['/HRCertifications']
          },
          {
              name: 'Information Technology',
              iconClasses: 'fas fa-users',
              path: ['/HRTemplates']
          },
          {
              name: 'Maintenance and Services',
              iconClasses: 'fas fa-users',
              path: ['/HRPerformance-Evaluation']
          },
          {
              name: 'Employees',
              iconClasses: 'fas fa-users',
              path: ['/HRActionMovements']
          },
      ]
  },
  {
    name: 'Users',
    iconClasses: 'bi bi-collection-fill',        
    children: [
        {
            name: 'Administrators',
            iconClasses: 'fas fa-users',
        },
        {
            name: 'Human Resource',
            iconClasses: 'fas fa-users',
            path: ['/HRAnnouncements']
        },
        {
            name: 'Accounting',
            iconClasses: 'fas fa-users',
            path: ['/HRCertifications']
        },
        {
            name: 'Information Technology',
            iconClasses: 'fas fa-users',
            path: ['/HRTemplates']
        },
        {
            name: 'Maintenance and Services',
            iconClasses: 'fas fa-users',
            path: ['/HRPerformance-Evaluation']
        },
        {
            name: 'Employees',
            iconClasses: 'fas fa-users',
            path: ['/HRActionMovements']
        },
    ]
},
]

function permissionDefault(){
  return {
    dashboard: true,
    profile: true,
    file_201: false,
    humanResource:false,
    recruitment:false,  
    leaves:false,  
    settings:false,

    employeeProfile: false,
    plantilla: false,
    serviceRecords: false,
    discipline: false,
    medical: false,
    appointments: false,
    
    reports: false,
    announcements: false,
    certifications: false,
    templates: false,
    evaluations: false,
    actions: false,
    
    leaveApproval: false,
    leaveCredits: false,
    leaveSettings: false,
  
    application: false,
    jobOpenings: false,
    requiredDocs: false,
  
    userRoles: false,
    tlogs: false,
    acl: false,
    positions: false,
    institutions: false,
  }

}
