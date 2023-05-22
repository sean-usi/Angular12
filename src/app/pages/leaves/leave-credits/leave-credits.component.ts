import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LeaveService } from '@services/leave/leave.service';
import { ProfileService } from '@services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-leave-credits',
    templateUrl: './leave-credits.component.html',
    styleUrls: ['./leave-credits.component.scss']
})
export class LeaveCreditsComponent implements OnInit {

  dtOptions: any
  form: FormGroup
  employees = []
  leaveCredits = []
  leaves = []
  leaveTypes = []
  positions = []
  employeeLeaveCredits = []
  dateToday = new Date()
  id_no: string = ''
  totalEarned: number = 0
  totalSick: number = 0
  totalVacation: number = 0
  modalCreateRef: NgbModalRef
  leaveHistory: boolean = false

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
    ) {
      this.form = fb.group({
        leaveType: [null, Validators.required],
        dateEarned: [null, Validators.required],
        credits: [null, Validators.required],
        id_no: [null],
        remarks: [null],
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
  }

  ngOnInit(): void {
    this.getLeaveTypes()
    this.getPositions()
  }

  get f() {
    return this.form
  }

  /**
   * Show Leave Credits
   * @param employee
   * @param content
   */
  showLeaveCredit(employee, content) {
    this.getLeaveCredits(employee.id_no)
    this.open(content)
  }

  /**
   * Show Leave History
   * @param employee
   * @param content
   */
  showLeaveHistory(employee, content, history?) {
    this.getLeaveHistory(employee.id_no)
    this.leaveHistory = true
    this.open(content)
  }

  /**
   * Get Employees
   */
  getEmployees() {
    this.leaveService.getLeaveCredits().subscribe(
      (response: any) => {
        this.leaveCredits = response?.rows
        this.leaveCredits.forEach(data => {
          data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
        });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
    this.profileService.getEmployees().subscribe(
      (response: any) => {
        this.employees = response?.rows
        this.leaveService.getLeaveCredits().subscribe(
          (response: any) => {
            this.leaveCredits = response?.rows
          },
          (error) => {
            this.toastr.error(error.error.reason)
          }
        )
        this.employees.forEach(data => {
          data.doc.employeeName = this.getEmployeeName(data.doc.id_no)
          data.doc.positionTitle = this.getPositionName(data.doc.serviceInformation?.position)
          data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
          data.doc.total = 0
          data.doc.sick = 0
          data.doc.vacation = 0
          let currentArray = this.leaveCredits.filter(data2 => data2.doc.id_no == data.doc.id_no)
          currentArray.forEach(data2 => {
            data.doc.leaveName = this.getLeaveTypeName(data2.doc.leaveType)
            data.doc.total = data.doc.total + data2.doc.credits
            if (data.doc.leaveName == 'Sick Leave') {
              data.doc.sick = data.doc.sick + data2.doc.credits
            }
            if (data.doc.leaveName == 'Vacation Leave') {
              data.doc.vacation = data.doc.vacation + data2.doc.credits
            }
          });
        });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
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
   * Get Positions
   */
  getPositions() {
    this.profileService.getPositions().subscribe(
      (response: any) => {
        this.positions = response?.rows
        this.getEmployees()
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
   * Get Leave Credits
   */
  getLeaveCredits(id_no) {
    this.id_no = id_no
    this.totalEarned = 0
    this.totalSick = 0
    this.totalVacation = 0
    this.leaveCredits = []
    this.leaveService.getLeaveCredits().subscribe(
      (response: any) => {
        this.leaveCredits = response?.rows.filter(data => data.doc.id_no == id_no)
        this.f.get('id_no').patchValue(id_no)
        this.leaveCredits.forEach(data => {
          this.totalEarned = this.totalEarned + data.doc.credits
          data.doc.originalCredits = data.doc.credits
          this.leaves.filter(data2 => data.doc.dateEarned == JSON.stringify(data2.doc.finishDateTime).split('T')[0].replace('"', '')).forEach(data3 => {
            data.doc.credits = data.doc.credits - data3.doc.totalDays
          })
          data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
        });
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Leave History
   */
  getLeaveHistory(id) {
    this.id_no = id
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
        this.getLeaveCredits(id)
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Submit Leave Credit
   */
  submitLeaveCredit() {
    if (this.form.valid) {
      this.leaveService.createLeaveCredit(this.form.value).subscribe(
        (response: any) => {
          let frmValue = this.form.value
          frmValue['id'] =  response.id
          let emp = this.employees.find(x=> x.doc.id_no == frmValue.id_no);
          if (!('leaveCard' in emp.doc)) {
            emp.doc.leaveCard = [];
            emp.doc['leaveCard'].push(frmValue)
          } else emp.doc['leaveCard'].push(frmValue)

          this.profileService.updateEmployee(emp.doc).subscribe(
            (response: any) => {
              console.log(response)
            })

          this.toastr.success('Leave Credit created successfully.')
          this.form.reset()
          this.dismissCreate()
          this.getLeaveCredits(this.id_no)
        },
        (error) => {
          this.toastr.error(error.error.reason)
        }
      )
    } else {
      this.form.markAllAsTouched()
    }
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

  goToLeaveHistory() {
    this.modalService.dismissAll()
    this.router.navigate(['/LeaveHistory/', this.id_no])
  }

  /**
   * Delete Leave
   * @param index
   */
  deleteLeaveCredit(data) {
    Swal.fire({
      icon: 'info',
      title: 'Do you want to delete this record?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.deleteLeaveCredit(data).subscribe(
          (response: any) => {
            let emp = this.employees.find(x=> x.doc.id_no == this.id_no); 
           
          if (('leaveCard' in emp.doc)) {
            emp.doc['leaveCard'] = emp.doc.leaveCard.filter(card => card.id !== data._id);
          }

            this.profileService.updateEmployee(emp.doc).subscribe(
              (response: any) => {
                // this.form.patchValue({_rev: response.rev})
              })

            Swal.fire('Deleted!', '', 'success')
            this.getLeaveCredits(this.id_no)
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
    this.modalService.open(content, { backdrop: false, centered: true, size: 'xl'})
  }

  /**
   * Open Modal Create
   * @param content
   */
  openCreate(content) {
    this.modalCreateRef = this.modalService.open(content, { backdrop: false, centered: true, size: 'lg' })
  }

  /**
   * Dismiss all modals
   */
  dismiss() {
    this.form.removeControl('_id')
    this.form.removeControl('_rev')
    this.modalService.dismissAll()
    window.location.reload()
  }

  /**
   * Dismiss modal
   */
  dismissCreate() {
    this.form.removeControl('_id')
    this.form.removeControl('_rev')
    this.modalCreateRef.dismiss()
  }
}
