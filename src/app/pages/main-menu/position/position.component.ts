import { BakcEndService } from '@/bakc-end.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {
leave: any;
createForm: FormGroup;
editForm: FormGroup;
id: any;
rev: any;
dtOptions: any;

  constructor(private service: BakcEndService, private router: Router) { }

  ngOnInit(): void {
    this.service.position().subscribe((data: any) => {
      this.leave = data.rows;
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
      console.log('Display', this.leave);
  });

    this.createForm = new FormGroup({
      position_num: new FormControl('', [Validators.required]),
      position_name: new FormControl('', [Validators.required]),
  });

  this.editForm = new FormGroup({
    position_num: new FormControl('', [Validators.required]),
    position_name: new FormControl('', [Validators.required]),
});

  }

  getPositions(){
    this.service.position().subscribe((data: any) => {
      this.leave = data.rows;
    });
  }
  refresh() {
    window.location.reload();
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['Positions']);
    // });
}

del(doc: any) {
  this.id = doc._id;
  this.rev = doc._rev;
}

deletePosition(id: any, rev: any) {
  console.log(id, rev)
      Swal.fire({
        icon: 'info',
        title: 'Do you want to delete this Position?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deletePosition(id, rev).subscribe((data) => {
            console.log(data);
          })
          Swal.fire('Deleted!', '', 'success').then((result) => {
            this.getPositions();
            // this.router
            //     .navigateByUrl('/', {skipLocationChange: true})
            //     .then(() => {
            //         this.router.navigate(['Positions']);
            //     });
        });
          
        }
  });
}

open(data: any) {
  this.editForm.controls['position_num'].setValue(data.position_num);
  this.editForm.controls['position_name'].setValue(data.position_name);
  this.id = data._id;
  this.rev = data._rev;
}

editPosition() {
  const position_num = this.editForm.value.position_num;
  const position_name = this.editForm.value.position_name;
  const postObject = {
      _id: this.id,
      _rev: this.rev,
      position_num: position_num,
      position_name: position_name,
  };
  this.service.editPosition(postObject, this.id).subscribe((data) => {
      console.log('Warning', data);
      Swal.fire(
          'Success!',
          ' Successfully Updated!',
          'success'
      ).then((result) => {
        this.getPositions();
        // this.router
          //     .navigateByUrl('/', {skipLocationChange: true})
          //     .then(() => {
          //         this.router.navigate(['Positions']);
          //     });
      });
  });
}

saveLeave() {
  const position_num = this.createForm.value.position_num;
  const position_name = this.createForm.value.position_name;
  const postObject = {
      position_num: position_num,
      position_name: position_name,
  };
  this.service.addPosition(postObject).subscribe((data) => {
      console.log('Warning', data);
      Swal.fire(
          'Success!',
          ' New Position has been Created!',
          'success'
      ).then((result) => {
        this.createForm.reset();
        this.getPositions();
          // this.router
          //     .navigateByUrl('/', {skipLocationChange: true})
          //     .then(() => {
          //         this.router.navigate(['Positions']);
          //     });
      });
  });
}

}
