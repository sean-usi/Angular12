import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveService } from '@services/leave/leave.service';
import { ProfileService } from '@services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-approval',
  templateUrl: './leave-approval.component.html',
  styleUrls: ['./leave-approval.component.scss']
})
export class LeaveApprovalComponent implements OnInit {

  dtOptions: any
  form: FormGroup
  leaves = []
  leaveTypes: any = []
  approvers: any = []
  employees: any = []
  dateToday = new Date()
  info: boolean = false
  previewURL: any
  id: any

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
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
      // buttons: [
      //   {extend: 'print', exportOptions:{ columns: 'thead th:not(.noExport)' }},
      //   {extend: 'copyHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
      //   {extend: 'csvHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
      //   {extend: 'excelHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
      // ]
    }
    this.form = fb.group({
      id_no: [null, Validators.required],
      leaveType: [null, Validators.required],
      startDateTime: [null, Validators.required],
      finishDateTime: [null, Validators.required],
      reason: [null, Validators.required],
      location: [null, Validators.required],
      leaveWithoutPay: [null],
      otherReason: [null],
      vacationDescription: [null],
      approver: [null],
      dateOfApproval: [null],
      dateFiled: [null],
      totalDays: [null],
      status: [null],
      department: [null],
      empFirstName: [null],
      empLastName: [null],
      empMiddleName: [null],
      position_title: [null],
      monthlyRate: [null],
    })
  }

  ngOnInit(): void {
    this.getLeaveTypes()
    this.getLeaveApprovers()
    this.getEmployees()
    this.datePipe.transform(this.dateToday,"yyyy-MM-dd")
  }

  get f() {
    return this.form
  }

  getLeaveTypeName(id) {
    for (let index = 0; index < this.leaveTypes?.length; index++) {
      if (this.leaveTypes[index].doc.code == id) {
        return this.leaveTypes[index].doc.leave_name
      }
    }
  }

  /**
   * Get Diff Days
   * @param startDate
   * @param endDate
   * @returns
   */
  getDiffDays(startDate, endDate) {
    if (startDate && endDate) {
      startDate = startDate.split('T')[0]
      endDate = endDate.split('T')[0]
      startDate = new Date(startDate)
      endDate = new Date(endDate)
      endDate.setDate(endDate.getDate() + 1)
      return Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
    }
  }

  /**
   * Get Employee Name
   * @param id
   * @returns
   */
  getEmployeeName(id) {
    for (let index = 0; index < this.employees?.length; index++) {
      if (this.employees[index].doc.id_no == id) {
        return this.employees[index].doc.firstName + ' ' + this.employees[index].doc.middleName + ' ' + this.employees[index].doc.lastName + ' ' + this.employees[index].doc.ext
      }
    }
  }

  /**
   * Get Employee Branch
   * @param id
   * @returns
   */
  getEmployeeBranch(id) {
    for (let index = 0; index < this.employees?.length; index++) {
      if (this.employees[index].doc.id_no == id) {
        return this.employees[index].doc.serviceInformation?.branch
      }
    }
  }

  /**
   * Get Leave Approvals
   */
  getLeaveApprovals() {
    this.leaveService.getLeaveApprovals().subscribe(
      (response: any) => {
        this.leaves = response?.rows
        this.leaves.sort((a, b) => -1)
        this.leaves.forEach(data => {
          data.doc.employeeName = this.getEmployeeName(data.doc.id_no)
          data.doc.branch = this.getEmployeeBranch(data.doc.id_no)
          data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
        });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Leave Types
   */
  getLeaveTypes() {
    this.leaveService.getLeaveTypes().subscribe(
      (response: any) => {
        this.leaveTypes = response?.rows
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Leave Approvers
   */
  getLeaveApprovers() {
    this.leaveService.getLeaveApprovers().subscribe(
      (response: any) => {
        this.approvers = response?.rows
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Employees
   */
  getEmployees() {
    this.profileService.getEmployees().subscribe(
      (response: any) => {
        this.employees = response?.rows
        this.getLeaveApprovals()
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Submit Leave Approval
   */
  submitLeaveApproval() {
    this.f.enable()
    this.f.get('totalDays').patchValue(this.getDiffDays(this.f.get('startDateTime').value, this.f.get('finishDateTime').value))
    this.appendData()

    console.log('aaaa',this.f.value);
    if (this.form.valid) {
      if (this.f.get('_id')?.value) {
        this.leaveService.updateLeaveApproval(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave updated successfully.')
            this.form.reset()
            this.dismiss()
            this.getLeaveApprovals()
          },
          (error) => {
            this.f.disable()
            this.toastr.error(error.error.reason)
          }
        )
      } else {
        this.leaveService.createLeaveApproval(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave created successfully.')
            this.form.reset()
            this.dismiss()
            this.getLeaveApprovals()
          },
          (error) => {
            this.toastr.error(error.error.reason)
          }
        )
      }
    } else {
      this.form.markAllAsTouched()
    }
  }

  approveLeaveApproval() {
    this.f.get('status').patchValue('Approved')
    this.f.get('dateOfApproval').patchValue(this.dateToday)
    this.submitLeaveApproval()
  }

  rejectLeaveApproval() {
    this.f.get('status').patchValue('Declined')
    this.submitLeaveApproval()
  }

  /**
   * Append data needed for Report
   */
  appendData(){
    const emp = this.employees.find(x=> x.doc.id_no == this.f.get('id_no').value)
    this.form.patchValue({
      empFirstName: emp.doc.firstName,
      empLastName: emp.doc.lastName,
      empMiddleName: emp.doc.middleName,
      position_title: emp.doc.position_title,
      department: emp.doc.serviceInformation.department,
      monthlyRate: emp.doc.serviceInformation.monthlyRate,
    });
  }


  /**
   * Edit Leave Approval
   * @param data
   * @param content
   */
  editLeaveApproval(data, content) {
    // this.f.get('dateFiled').patchValue(this.dateToday.toString().split('T')[0])
    this.form.addControl('_id', new FormControl(null, Validators.required))
    this.form.addControl('_rev', new FormControl(null))
    this.form.patchValue(data)
    this.info = true
    this.open(content)
    this.f.disable()
  }

  /**
   * Delete Leave
   * @param index
   */
  deleteLeaveApproval(data) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.deleteLeaveApproval(data).subscribe(
          (response: any) => {
            Swal.fire('Deleted!', '', 'success').then(() => { window.location.reload() })
            this.getLeaveApprovals()
          },
          (error) => {
            this.toastr.error(error.error.reason)
          }
        )
      }
    });
  }

  /**
   * Open Modal
   * @param content
   */
  open(content) {
    this.f.enable()
    this.f.get('dateFiled').patchValue(this.dateToday)
    this.modalService.open(content, { backdrop: false, centered: true, size: 'lg' })
  }


  /**
   * Open Preview Modal
   * @param content
   */
   openPreview(content, id) {
     this.id = id
    this.previewURL = 'http://localhost:8080/jasperserver/rest_v2/reports/reports/AFLeave_Report.html?_id="'+ this.id +'"'
    this.modalService.open(content, { backdrop: false, centered: true, size: 'lg' })
  }

  /**
   * Dismiss all modals
   */
  dismiss() {
    this.form.removeControl('_id')
    this.form.removeControl('_rev')
    this.info = false
    this.modalService.dismissAll()
  }

  print(){
    window.open('http://localhost:8080/jasperserver/rest_v2/reports/reports/AFLeave_Report.pdf?_id="'+ this.id +'"', "_blank");
  }
}



