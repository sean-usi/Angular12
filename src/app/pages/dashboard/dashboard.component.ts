import { BakcEndService } from '@/bakc-end.service';
import {Component, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveService } from '@services/leave/leave.service';
import { ProfileService } from '@services/profile/profile.service';
import { RecruitmentService } from '@services/recruitment/recruitment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  panelOpenState = false;
  dateToday = new Date()
  positions = []
  leaves = []
  jobOpenings = []
  dtOptions = {
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

  employees: any = []
  announcements: any = [];

  constructor(private profileService: ProfileService,private recruitmentService: RecruitmentService, private toastr: ToastrService, private leaveService: LeaveService, private service: BakcEndService) {

  }

  ngOnInit() {
    this.getPositions()
    this.getJobOpenings()
    this.getAnnouncements()
  }


  /**
   * Get Job Openings
   */
   getJobOpenings() {
    this.recruitmentService.getJobOpenings().subscribe(
      (response: any) => {
        console.log(response?.rows)
        this.jobOpenings = response?.rows
        this.jobOpenings.forEach(data => {
          data.doc.positionName = this.getPositionName(data.doc.position)
        })
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  /**
   * Get Leave Approvals
   */
  getLeaveApprovals() {
    this.leaveService.getLeaveApprovals().subscribe(
      (response: any) => {
        this.leaves = response?.rows
        this.leaves.sort((a, b) => -1)
        this.leaves = this.leaves.filter(data => {
          if ((new Date(data.doc.startDateTime) <= this.dateToday) && (this.dateToday <= new Date(data.doc.finishDateTime)) && data.doc.status == 'Approved') {
            return data
          }
        })
        this.leaves.forEach(data => {
          data.doc.employeeName = this.getEmployeeName(data.doc.id_no)
          // data.doc.branch = this.getEmployeeBranch(data.doc.id_no)
          // data.doc.leaveName = this.getLeaveTypeName(data.doc.leaveType)
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
   * Get Employees and get first data
   */
  getEmployees() {
    this.profileService.getEmployees().subscribe(
      (response: any) => {
        this.employees = response?.rows
        this.employees.forEach(data => {
          data.doc.positionTitle = this.getPositionName(data.doc.serviceInformation?.position)
        });
        this.getLeaveApprovals()
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
   * Get Announcements
   */
  getAnnouncements() {
    this.service.announcementsList().subscribe(
      (response: any) => {
        this.announcements = response?.rows
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

}
