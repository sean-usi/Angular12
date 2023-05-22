import { Component, OnInit } from '@angular/core';
import { BakcEndService } from '@/bakc-end.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '@services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var header = {
  headers: new HttpHeaders({
    'Authorization':  `Basic ${btoa('jasperadmin:jasperadmin')}`,
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  })
    .set('Authorization',  `Basic ${btoa('jasperadmin:jasperadmin')}`)
}

const jasperHeaders = new HttpHeaders({
  Authorization: 'Basic ' + btoa('jasperadmin:jasperadmin')
});
@Component({
  selector: 'app-hr-reports',
  templateUrl: './hr-reports.component.html',
  styleUrls: ['./hr-reports.component.scss']
})
export class HrReportsComponent implements OnInit {

  employee: any;
  posts: any;
  dtOptions: any;
  createForm: FormGroup;
  editForm: FormGroup;
  certForm: FormGroup;
  id: any;
  rev: any;
  leave: any;
  positionForm: any;
  app: any;
  viewForm: FormGroup;
  emp: any;
  rate: any;
  previewURL: any
  positions = []

  constructor(private service: BakcEndService, private router: Router, private modalService: NgbModal, private profileService: ProfileService, private toastr: ToastrService, private http : HttpClient) { }

  ngOnInit(): void {
    this.getPositions()

    this.service.employee().subscribe((data: any) => {
      this.employee = data.rows;
      this.emp = this.employee;

    });

      this.service.rating().subscribe((data: any) => {
        this.rate = data.rows;
    });

    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      id_no: new FormControl(null, [Validators.required]),
      positionTitle: new FormControl(null),
      assessment: new FormControl(null, [Validators.required]),
      date_cover: new FormControl(null, [Validators.required]),
      absent: new FormControl(null, [Validators.required]),
      evaluator: new FormControl(null, [Validators.required]),
      date_from: new FormControl(null, [Validators.required]),
      date_to: new FormControl(null, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
    });

    this.editForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      id_no: new FormControl(null, [Validators.required]),
      positionTitle: new FormControl(null),
      assessment: new FormControl(null, [Validators.required]),
      date_cover: new FormControl(null, [Validators.required]),
      absent: new FormControl(null, [Validators.required]),
      evaluator: new FormControl(null, [Validators.required]),
      date_from: new FormControl(null, [Validators.required]),
      date_to: new FormControl(null, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
    });

    this.certForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      id: new FormControl(null, [Validators.required]),
    })
  }

  /**
   * Get Positions
   */
  getPositions() {
    this.profileService.getPositions().subscribe(
      (response: any) => {
        this.positions = response?.rows
        this.service.performance().subscribe((data: any) => {
          this.app = data.rows;
          this.posts = this.app;
          this.posts.forEach(data => {
            data.doc.position_title = this.getPositionName(data.doc.positionTitle)
          });
          this.dtOptions = {
            language: {
              search: '',
              searchPlaceholder: 'Search',
              lengthMenu: 'Show _MENU_ entries'
            },
            pageLength: 10,
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
      });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Position Name
   */
  getPositionName(id) {
    for (let index = 0; index < this.positions?.length; index++) {
      if (this.positions[index].doc.position_num == id) {
        return this.positions[index].doc.position_name
      }
    }
  }


  /**
   * Dismiss all modals
   */
  dismiss() {
    this.modalService.dismissAll()
  }

  /**
   * Open Modal
   * @param content
   */
  open(content, index?) {
    this.modalService.open(content, { backdrop: false, centered: false, size: 'lg'})
  }

  addEvaluation() {

    if (this.createForm.valid) {
      const id_no = this.createForm.value.id_no;
      const name = this.createForm.value.name;
      const assessment = this.createForm.value.assessment;
      const date_cover = this.createForm.value.date_cover;
      const absent = this.createForm.value.absent;
      const evaluator = this.createForm.value.evaluator;
      const comment = this.createForm.value.comment;
      const date_from = this.createForm.value.date_from;
      const date_to = this.createForm.value.date_to;
      const positionTitle = this.createForm.value.positionTitle;
      const postObject = {
          id_no: id_no,
          name: name,
          assessment: assessment,
          date_cover: date_cover,
          absent: absent,
          evaluator: evaluator,
          comment: comment,
          date_from: date_from,
          date_to: date_to,
          positionTitle: positionTitle,
      };
      this.service.createEvaluation(postObject).subscribe((data) => {
          console.log('Warning', data);
          Swal.fire(
              'Success!',
              ' New File has been Created!',
              'success'
          ).then((result) => {
              window.location.reload()
              this.dismiss()
          });
      });
    } else {
      this.createForm.markAllAsTouched()
    }
}

editEval() {
  const id_no = this.editForm.value.id_no;
  const name = this.editForm.value.name;
  const assessment = this.editForm.value.assessment;
  const rating_new = this.editForm.value.rating_new;
  const remarks_new = this.editForm.value.remarks_new;
  const rating_old = this.editForm.value.rating_old;
  const remarks_old = this.editForm.value.remarks_old;
  const date_cover = this.editForm.value.date_cover;
  const absent = this.editForm.value.absent;
  const evaluator = this.editForm.value.evaluator;
  const comment = this.editForm.value.comment;
  const date_from = this.editForm.value.date_from;
  const date_to = this.editForm.value.date_to;
  const positionTitle = this.editForm.value.positionTitle;
  const postObject1 = {
      _id: this.id,
      _rev: this.rev,
      id_no: id_no,
      name: name,
      assessment: assessment,
      rating_new: rating_new,
      remarks_new: remarks_new,
      rating_old: rating_old,
      remarks_old: remarks_old,
      date_cover: date_cover,
      absent: absent,
      evaluator: evaluator,
      comment: comment,
      date_from: date_from,
      date_to: date_to,
      positionTitle: positionTitle,
  };
  this.service.editPerf(postObject1, this.id).subscribe((data) => {
      console.log('Warning', data);
      Swal.fire(
          'Success!',
          ' Successfully Updated!',
          'success'
      ).then((result) => {
        window.location.reload()
        this.dismiss()
      });
  });
}

edit(data: any, content){
  this.editForm.controls['name'].setValue(data.name);
  this.editForm.controls['id_no'].setValue(data.id_no);
  this.editForm.controls['positionTitle'].setValue(data.positionTitle);
  this.editForm.controls['assessment'].setValue(data.assessment);
  this.editForm.controls['date_cover'].setValue(data.date_cover);
  this.editForm.controls['absent'].setValue(data.absent);
  this.editForm.controls['evaluator'].setValue(data.evaluator);
  this.editForm.controls['comment'].setValue(data.comment);
  this.editForm.controls['date_from'].setValue(data.date_from);
  this.editForm.controls['date_to'].setValue(data.date_to);
  this.id = data._id;
  this.rev = data._rev;
  this.open(content)
}

deleteApp(id: any, rev: any) {
  console.log(id, rev)
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this File?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteEval(id, rev).subscribe((data) => {
            console.log(data);
          })
          Swal.fire('Deleted!', '', 'success').then((result) => {
            window.location.reload()
            this.dismiss()
        });

        }
  });
}

  getId(){
    var emp_name = this.employee.filter((x: any)=>
    x.doc.id_no == this.createForm.value.id_no
    )
    this.createForm.controls['name'].setValue(emp_name[0].doc.firstName + ' ' + emp_name[0].doc.middleName + ' ' + emp_name[0].doc.lastName)
    this.createForm.controls['positionTitle'].setValue(emp_name[0].doc.serviceInformation.position)
  }

  getIdOf(){
    var emp = this.employee.filter(
    (x: any)=>
    x.doc.id_no == this.editForm.value.id_no
    )
    this.editForm.controls['name'].setValue(emp[0].doc.firstName + ' ' + emp[0].doc.middleName + ' ' + emp[0].doc.lastName)
    this.editForm.controls['positionTitle'].setValue(emp[0].doc.serviceInformation.position)
  }

  refresh() {
    window.location.reload()
    this.dismiss()
  }

  printCert(){
    this.goToLink()
    console.log(this.certForm.value)
  }

  goToLink(){
    this.http.get(this.previewURL, {
      responseType: 'text',
      headers: {
        'Authorization': 'Basic ' + btoa('jasperadmin:jasperadmin')
      }
    }).subscribe((response: any) => {
      // Handle the response
      let printWindow = window.open('', '_blank');
      printWindow.document.write(response);
      setTimeout(function(){
        printWindow.print();
      },1000)
    });
  }

  typeChange(){
    // console.log(this.certForm.controls['type'].value)
    // console.log(this.certForm.controls['id'].validator)
    if(this.certForm.value.type == 'WaiverForm_Report' || this.certForm.value.type == 'ELeaveCard_Report'){
      // this.certForm.controls['id'].setValidators(Validators.required)
      this.certForm.controls['id'].patchValue(null)
      // this.previewURL = 'http://localhost:8080/jasperserver/rest_v2/reports/reports/' + this.certForm.controls['type'].value + '.html?id=' + this.certForm.controls['id'].value
    }
    else if(this.certForm.value.type == 'RPFVP_Report'){
      // this.certForm.controls['id'].clearValidators()
      this.certForm.controls['id'].patchValue(' ')
      this.previewURL = '/jasperserver/rest_v2/reports/reports/' + this.certForm.controls['type'].value + '.html'
    }
  }

  idChange(){
    // console.log(this.certForm.controls['type'].value)
    // console.log(this.certForm.controls['id'].validator)
    if(this.certForm.value.type == 'WaiverForm_Report'){
      // this.certForm.controls['id'].setValidators(Validators.required)
      // this.certForm.controls['id'].patchValue(null)
      this.previewURL = '/jasperserver/rest_v2/reports/reports/' + this.certForm.controls['type'].value + '.html?_id="' + this.certForm.controls['id'].value  + '"'
    }
    if(this.certForm.value.type == 'ELeaveCard_Report'){
      // this.certForm.controls['id'].setValidators(Validators.required)
      // this.certForm.controls['id'].patchValue(null)
      this.previewURL = '/jasperserver/rest_v2/reports/reports/' + this.certForm.controls['type'].value + '.html?_id="' + this.certForm.controls['id'].value  + '"'
    }
    else if(this.certForm.value.type == 'RPFVP_Report'){
      // this.certForm.controls['id'].clearValidators()
      this.certForm.controls['id'].patchValue(' ')
      this.previewURL = '/jasperserver/rest_v2/reports/reports/' + this.certForm.controls['type'].value + '.html'
    }
  }
}

