import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators, EmailValidator} from '@angular/forms';
import {AppService} from '@services/app.service';
import {ToastrService} from 'ngx-toastr';
import { BakcEndService } from '@/bakc-end.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    users = []

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private service: BakcEndService,
        private modalService: NgbModal,
        private router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.service.allUsers().subscribe(
            (response: any) => {
              this.users = response?.rows
            },
            (error) => {
              this.toastr.error(error.error.reason)
            }
          )
        this.registerForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
            password: new UntypedFormControl(null, [Validators.required]),
            retypePassword: new UntypedFormControl(null, [Validators.required]),
            creationDate: new UntypedFormControl(null)
        });
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            // this.registerForm.get('creationDate').patchValue(Date.now())
            this.registerForm.patchValue({
                creationDate: Date.now(), 
              });
            console.log(this.registerForm.value)
            await this.appService.registerByAuth(this.registerForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    async registerByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.registerByGoogle();
        this.isGoogleLoading = false;
    }

    async registerByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.registerByFacebook();
        this.isFacebookLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }

    onSubmit() {
        let formValues = this.registerForm.value
        formValues['setting_id'] = environment.defaultSetting;
        formValues['isActive'] = true;

        this.registerForm.patchValue({
            creationDate: new Date(), 
        });
        console.log(this.registerForm.value)
        if(this.registerForm.controls.email.invalid){
            console.log(this.registerForm.controls.password.value, this.registerForm.controls.retypePassword.value)
            this.toastr.error('Invalid email.');
        }
        else if(this.registerForm.controls.password.value != this.registerForm.controls.retypePassword.value){
            console.log(this.registerForm.controls.password.value, this.registerForm.controls.retypePassword.value)
            this.toastr.error('Password does not match.');
        }
        else if(this.users.find((u) => u.doc.email == this.registerForm.controls.email.value)){
            this.toastr.error('Email has already been used.');
        }
        else{
            this.service.addUser(this.registerForm.value).subscribe((data) => {
                console.log('Warning', data);
                Swal.fire(
                    'Success!',
                    'Registration successful.',
                    'success'
                ).then((result) => {
                    this.dismiss()
                    this.router.navigate(['/']);
                    // window.location.reload()
                });
            });
        }
    
    } 

    dismiss() {
        this.modalService.dismissAll()
    }

}
