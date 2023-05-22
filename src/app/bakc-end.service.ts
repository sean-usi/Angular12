import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

var header = {
  headers: new HttpHeaders()
    .set('Authorization',  `Basic ${btoa('admin:h@n@')}`)
}

var postHeader = {
  headers: new HttpHeaders()
    .set('Authorization',  `Basic ${btoa('admin:h@n@')}`)
    .set('Content-Type',  'application/json')
}

var leaveHeader = {
  headers: new HttpHeaders()
    .set('Authorization',  `Basic ${btoa('admin:h@n@')}`)
    .set('Content-Type',  'application/json')
}

var delHeader = {
  headers: new HttpHeaders()
    .set('Authorization',  `Basic ${btoa('admin:h@n@')}`)
    .set('Content-Type',  'application/json')
}

var editHeader = {
  headers: new HttpHeaders()
    .set('Authorization',  `Basic ${btoa('admin:h@n@')}`)
    .set('Content-Type',  'application/json')
}

@Injectable({
  providedIn: 'root'
})
export class BakcEndService {
  url = "http://127.0.0.1:5984/user_groups/_all_docs?include_docs=true";
  groupSettingsUrl = "http://127.0.0.1:5984/user_groups/_all_docs?include_docs=true"
  approveUrl = "http://127.0.0.1:5984/leave_approval/_all_docs?include_docs=true";
  announcements = "http://127.0.0.1:5984/announcements/_all_docs?include_docs=true";
  announcementsUrl = "http://127.0.0.1:5984/announcements/";
  usersUrl = "http://127.0.0.1:5984/users/";
  allUsersUrl = "http://127.0.0.1:5984/users/_all_docs?include_docs=true";
  creditUrl = "http://127.0.0.1:5984/leave_credit/_all_docs?include_docs=true";
  leaveUrl = "http://127.0.0.1:5984/leave_types/_all_docs?include_docs=true";
  positions = "http://127.0.0.1:5984/position/_all_docs?include_docs=true";
  appointments = "http://127.0.0.1:5984/appointment/_all_docs?include_docs=true";
  performanceUrl = "http://127.0.0.1:5984/performance_evaluation/_all_docs?include_docs=true";
  approverUrl = "http://127.0.0.1:5984/approvers/_all_docs?include_docs=true";
  employeeUrl = "http://127.0.0.1:5984/employees/_all_docs?include_docs=true";
  ratingUrl = "http://127.0.0.1:5984/rating_table/_all_docs?include_docs=true";
  advanceUrl = "http://127.0.0.1:5984/advance_settings/_all_docs?include_docs=true";
  institution = "http://127.0.0.1:5984/institution/_all_docs?include_docs=true";
  postUrl = "http://127.0.0.1:5984/user_groups";
  leaveTypeUrl = "http://127.0.0.1:5984/leave_types";
  positionUrl = "http://127.0.0.1:5984/position";
  createLeaveTypeUrl = "http://127.0.0.1:5984/leave_approval";
  createEvaluationUrl = "http://127.0.0.1:5984/performance_evaluation";
  createAppointmentUrl = "http://127.0.0.1:5984/appointment";
  createCreditUrl = "http://127.0.0.1:5984/leave_credit";
  institutionUrl = "http://127.0.0.1:5984/institution/";

  constructor(private http: HttpClient) { }

  users(): Observable<any> {
    return this.http.get(this.url, header);
  }

  institutionData(): Observable<any> {
    return this.http.get(this.institution, header);
  }

  addInstitution(data:any): Observable<any> {
    const body=JSON.stringify(data);
    console.log(body);
    return this.http.post(this.institutionUrl, body, postHeader);
  }

  updateInstitution(data: any, id: any): Observable<any> {
    const editUrl = this.institutionUrl + id;
    console.log(data);
    return this.http.put(editUrl, data, editHeader);

  }

  announcementsList(): Observable<any> {
    return this.http.get(this.announcements, header);
  }
  approval(): Observable<any> {
    return this.http.get(this.approveUrl, leaveHeader);
  }
  credits(): Observable<any> {
    return this.http.get(this.creditUrl, header);
  }
  leaveTypes() {
    return this.http.get(this.leaveUrl, header);
  }
  position() {
    return this.http.get(this.positions, header);
  }
  appointment() {
    return this.http.get(this.appointments, header);
  }
  performance() {
    return this.http.get(this.performanceUrl, header);
  }
  approvers() {
    return this.http.get(this.approverUrl, header);
  }
  employee() {
    return this.http.get(this.employeeUrl, header);
  }
  rating() {
    return this.http.get(this.ratingUrl, header);
  }
  advanceFunc(): Observable<any>  {
    return this.http.get(this.advanceUrl, postHeader);
  }
  allUsers(): Observable<any>  {
    return this.http.get(this.allUsersUrl, postHeader);
  }
  addGroup(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.postUrl, body, postHeader);
  }
  addLeave(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.leaveTypeUrl, body, leaveHeader);
  }
  addPosition(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.positionUrl, body, leaveHeader);
  }
  createLeave(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.createLeaveTypeUrl, body, leaveHeader);
  }
  createEvaluation(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.createEvaluationUrl, body, leaveHeader);
  }
  createAppointment(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.createAppointmentUrl, body, leaveHeader);
  }
  createCredit(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.createCreditUrl, body, leaveHeader);
  }
  removeGroup(id: any, rev: any): Observable<any> {
    const delUrl = "http://127.0.0.1:5984/user_groups/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delUrl, delHeader)

  }
  deleteLeave(id: any, rev: any): Observable<any> {
    const delUrl = "http://127.0.0.1:5984/leave_approval/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delUrl, delHeader)

  }
  deletePosition(id: any, rev: any): Observable<any> {
    const delPosUrl = "http://127.0.0.1:5984/position/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delPosUrl, delHeader)

  }
  deleteApp(id: any, rev: any): Observable<any> {
    const delPosUrl = "http://127.0.0.1:5984/appointment/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delPosUrl, delHeader)

  }
  deleteEval(id: any, rev: any): Observable<any> {
    const delPosUrl = "http://127.0.0.1:5984/performance_evaluation/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delPosUrl, delHeader)

  }
  deleteCred(id: any, rev: any): Observable<any> {
    const delUrl = "http://127.0.0.1:5984/leave_credit/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delUrl, delHeader)

  }
  removeLeave(id: any, rev: any): Observable<any> {
    const delUrl = "http://127.0.0.1:5984/leave_types/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delUrl, delHeader)

  }
  updateGroup(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/user_groups/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  editLeave(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/leave_approval/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  editApp(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/appointment/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  editPerf(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/performance_evaluation/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  editPosition(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/position/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }

  editCred(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/leave_credit/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }

  updateLeave(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/leave_types/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  addUser(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post(this.usersUrl, body, leaveHeader);
  }
  editUser(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/users/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);

  }
  deleteUser(id: any, rev: any): Observable<any> {
    const delPosUrl = "http://127.0.0.1:5984/users/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delPosUrl, delHeader)

  }
  addAnnouncement(data:any): Observable<any> {
    const body=JSON.stringify(data);
    console.log(body);
    return this.http.post(this.announcementsUrl, body, leaveHeader);
  }
  editAnnouncement(data: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/announcements/"+ id;
    console.log(data);
    return this.http.put(editUrl, data, editHeader);

  }
  deleteAnnouncement(id: any, rev: any): Observable<any> {
    const delPosUrl = "http://127.0.0.1:5984/announcements/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delPosUrl, delHeader)

  }

  group_settings(): Observable<any> {
    return this.http.get(this.groupSettingsUrl, header);
  }

  updateUserGroup(display: any, id: any): Observable<any> {
    const editUrl = "http://127.0.0.1:5984/user_groups/"+ id;
    console.log(display);
    return this.http.put(editUrl, display, editHeader);
  }

  removeUserGroup(id: any, rev: any): Observable<any> {
    const delUrl = "http://127.0.0.1:5984/user_groups/"+ id + "/?rev="+ rev;
    console.log(id);
    return this.http.delete(delUrl, delHeader)
  }


  addUserGroup(person:any): Observable<any> {
    const body=JSON.stringify(person);
    console.log(body);
    return this.http.post('http://127.0.0.1:5984/user_groups', body, postHeader);
  }

  getUserGroupbyId(id): Observable<any> {
    const group_id = id
    return this.http.get(`http://127.0.0.1:5984/user_groups/_all_docs?include_docs=true&key=\"${group_id}\"`, header);
  }

  getSystemUser():Observable<any>{
    const userId = localStorage.getItem('userID');
    return this.http.get(`http://localhost:5984/users/_all_docs?include_docs=true&key=\"${userId}\"`, header);
  }

}
