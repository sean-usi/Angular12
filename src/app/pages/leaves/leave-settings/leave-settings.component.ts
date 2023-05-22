import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveService } from '@services/leave/leave.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-leave-settings',
    templateUrl: './leave-settings.component.html',
    styleUrls: ['./leave-settings.component.scss']
})
export class LeaveSettingsComponent implements OnInit {

  leaveTypes = []
  form: FormGroup
  dtOptions: any
  dateToday = new Date()
  isEdit: boolean = false

  constructor(
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal
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
      buttons: [
        {extend: 'print', exportOptions:{ columns: 'thead th:not(.noExport)' }},
        {extend: 'copyHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
        {extend: 'csvHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
        {extend: 'excelHtml5', exportOptions:{ columns: 'thead th:not(.noExport)' }},
      ]
    }
    this.form = fb.group({
      code: [null, Validators.required],
      leave_name: [null, Validators.required],
      classification: [null, Validators.required],
      description: [null, Validators.required],
      increment: [null, Validators.required],
      incrementSummary: [null, Validators.required],
      autoReset: [null, Validators.required],
      autoResetSummary: [null, Validators.required],
      monetization: [null, Validators.required],
      conversion: [null, Validators.required],
      amount: [null, Validators.required],
      remarks: [null, Validators.required],
      viewInReport: [null],
      referenceNumber: [null],
      inactive: [null],

      leaveReset: [null],
      leaveApproval: [null],
      approverCount: [null],
      checkIfAttachmentIsRequired: [null],
    })
  }

  ngOnInit(): void {
    this.getLeaveTypes()
  }

  get f() {
    return this.form
  }

  /**
   * Get Leave Types
   */
  getLeaveTypes() {
    this.leaveTypes = []
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
   * Edit Leave Type
   * @param data
   * @param content
   */
  editLeaveType(data, content) {
    this.form.addControl('_id', new FormControl(null, Validators.required))
    this.form.addControl('_rev', new FormControl(null))
    this.f.get('referenceNumber').disable()
    this.form.patchValue(data)
    this.isEdit = !this.isEdit
    this.open(content)
  }

  /**
   * Delete Leave
   * @param index
   */
  deleteLeaveType(data) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.deleteLeaveType(data).subscribe(
          (response: any) => {
            Swal.fire('Deleted!', '', 'success')
            this.getLeaveTypes()
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
    this.modalService.open(content, { backdrop: false, centered: true, size: 'xl' })
  }

  /**
   * Dismiss all modals
   */
  dismiss() {
    this.form.removeControl('_id')
    this.form.removeControl('_rev')
    this.isEdit = false
    this.f.get('referenceNumber').enable()
    this.modalService.dismissAll()
  }

  submitLeaveType() {
    if (this.form.valid) {
      if (this.f.get('_id')?.value) {
        this.leaveService.updateLeaveType(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave type updated successfully.')
            this.form.removeControl('_id')
            this.form.removeControl('_rev')
            this.form.reset()
            this.dismiss()
            this.getLeaveTypes()
          },
          (error) => {
            this.f.disable()
            this.toastr.error(error.error.reason)
          }
        )
      } else {
        this.f.get('referenceNumber').patchValue(Math.floor(Math.random() * 9999999999) + 1)
        this.leaveService.createLeaveType(this.form.value).subscribe(
          (response: any) => {
            this.toastr.success('Leave type created successfully.')
            this.form.reset()
            this.dismiss()
            this.getLeaveTypes()
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
}
