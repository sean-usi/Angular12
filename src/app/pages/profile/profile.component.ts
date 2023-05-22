import {Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService
    ) {
    this.form = fb.group({
      _id: ['', Validators.required],
      _rev: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      middleName: ['', Validators.pattern('[a-zA-Z ]*')],
      gender: ['', Validators.pattern('[a-zA-Z ]*')],
      birthDate: ['', Validators.required],
      placeOfBirth: [''],
      telephone: ['', [Validators.max(10), Validators.pattern('[0-9]*')]],
      mobileNumber: ['', [Validators.max(11), Validators.pattern('[0-9]*')]],
      email: ['', Validators.email],
      presentAddress: [''],
      permanentAddress: [''],
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      themeSettings: fb.group({
        themes: ['Default', Validators.required],
        menu: ['Default', Validators.required],
        fixedHeader: [false, Validators.required],
        fixedNavigation: [false, Validators.required],
        fixedRibbon: [false, Validators.required],
        fixedFooter: [false, Validators.required],
      })
    })
  }

  ngOnInit(): void {
    this.getUserById()
  }

  get f() {
    return this.form
  }

  /**
   * Get User By Id
   */
  getUserById() {
    this.profileService.getUser().subscribe(
      (response: any) => {
        const data = response?.rows[0]?.doc
        this.form.patchValue({...data, _id: data._id})
      },
      (error) => {
        this.toastr.error(error.error.reason)
      }
    )
  }

  updateUser() {
    // if (this.form.valid) {
      this.profileService.updateUser(this.form.value).subscribe(
        (response: any) => {
          this.form.patchValue({_rev: response.rev})
          this.toastr.success('Profile update successfully.')
        },
        (error) => {
          this.toastr.error(error.error.reason)
        }
      )
    // } else {
    //   this.form.markAllAsTouched()
    // }
  }
}
