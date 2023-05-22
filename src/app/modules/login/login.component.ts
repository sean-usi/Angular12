import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { BakcEndService } from '@/bakc-end.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;
    insData: any;
    logo: any = '/assets/img/HR-LOGO-1024x1024.png';

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private appService: AppService,
        private http: HttpClient,
        private service: BakcEndService
    ) {}

    ngOnInit() {
        // this.renderer.addClass(
        //     document.querySelector('app-root'),
        //     'login-page'
        // );

        this.service.institutionData().subscribe((res : any) => {
            if(res.rows.length == 0){
                this.insData = {
                    "systemName": "Employee Online Services",
                    "headName": "Darlito A. Perez, Jr.",
                    "institutionName": "Human Resource Management Office",
                    "acronym": "HRMO",
                    "address": "sadfsaf",
                    "contact": "09123456789",
                    "email": "chrmo.legazpicity@gmail.com",
                }
            }
            else{
                this.insData = res.rows[0].doc
            }
            if(this.insData._attachments){
                var keys = Object.keys(this.insData._attachments)
                var type = this.insData._attachments[keys[0]].content_type
                this.http.get(`http://127.0.0.1:5984/institution/${this.insData._id}/${keys[0]}`, {
                    responseType: 'blob',
                    headers: {
                        'Authorization': 'Basic ' + btoa('admin:h@n@')
                    }
                    })
                    .toPromise().then(response => {
                    var xx = URL.createObjectURL(response);
                    this.logo = (xx).toString()
                })
            }
        })
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'layout-fixed'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        if (this.loginForm.valid) {
            this.isAuthLoading = true;
            await this.appService.loginByAuth(this.loginForm.value);
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Form is not valid!');
        }
    }

    async loginByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.loginByGoogle();
        this.isGoogleLoading = false;
    }

    async loginByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.loginByFacebook();
        this.isFacebookLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
