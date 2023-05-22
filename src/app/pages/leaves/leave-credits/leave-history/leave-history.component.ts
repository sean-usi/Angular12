import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LeaveService } from '@services/leave/leave.service';
import { ProfileService } from '@services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.scss']
})
export class LeaveHistoryComponent implements OnInit {

  dtOptions: any
  form: FormGroup
  leaves = []
  leaveTypes: any = []
  employees: any = []
  id_no: string = ''

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private profileService: ProfileService,
  ) {
    this.activatedRoute.params.subscribe(data => {
      this.id_no = data.id
    })
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
    this.form = fb.group({
      referenceNumber: [null],
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
    })
    this.form.controls.id_no.patchValue(this.id_no)
  }

  ngOnInit(): void {
    this.getLeaveTypes()
  }

  get f() {
    return this.form
  }


  /**
   * Get Leave History
   */
  getLeaveHistory() {
    this.leaveService.getLeaveHistory().subscribe(
      (response: any) => {
        this.leaves = response?.rows.filter(data => {
          return data.doc.id_no == this.id_no
        })
        this.leaves.sort((a, b) => -1)
        this.leaves.forEach(data => {
          // data.doc.employeeName = this.getEmployeeName(data.doc.id_no)
          // data.doc.branch = this.getEmployeeBranch(data.doc.id_no)
          data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
        });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }
  /**
   * Get Leave Type Name
   * @param id
   * @returns
   */
  getLeaveTypeName(id) {
    for (let index = 0; index < this.leaveTypes?.length; index++) {
      if (this.leaveTypes[index].doc.code == id) {
        return this.leaveTypes[index].doc.leave_name
      }
    }
  }

  /**
   * Get Leave Types
   */
  getLeaveTypes() {
    this.leaveService.getLeaveTypes().subscribe(
      (response: any) => {
        this.leaveTypes = response?.rows
        this.getLeaveHistory()
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
        this.getLeaveHistory()
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
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
   * Submit Leave History
   */
  submitLeaveHistory() {
    this.f.get('totalDays').patchValue(this.getDiffDays(this.f.get('startDateTime').value, this.f.get('finishDateTime').value))
    if (this.form.valid) {
      if (this.f.get('_id')?.value) {
        this.leaveService.updateLeaveHistory(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave updated successfully.')
            this.form.removeControl('_id')
            this.form.removeControl('_rev')
            this.form.reset()
            this.getLeaveHistory()
          },
          (error) => {
            this.f.disable()
            this.toastr.error(error.error.reason)
          }
        )
      } else {
        this.f.get('referenceNumber').patchValue(Math.floor(Math.random() * 9999999999) + 1)
        this.leaveService.createLeaveHistory(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave created successfully.')
            this.form.reset()
            this.getLeaveHistory()
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

  /**
   * Edit Leave History
   * @param data
   * @param content
   */
  editLeaveHistory(data) {
    // this.f.get('dateFiled').patchValue(this.dateToday.toString().split('T')[0])
    this.form.addControl('_id', new FormControl(null, Validators.required))
    this.form.addControl('_rev', new FormControl(null))
    this.form.patchValue(data)
  }

  /**
   * Delete Leave
   * @param index
   */
  deleteLeaveHistory(data) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.deleteLeaveHistory(data).subscribe(
          (response: any) => {
            Swal.fire('Deleted!', '', 'success')
            this.getLeaveHistory()
          },
          (error) => {
            this.toastr.error(error.error.reason)
          }
        )
      }
    });
  }
}
