import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;

    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

    async loginByAuth({email, password}) {
        try {
          const url = `http://localhost:5984/users/_design/views/_view/auth?key=[\"${email}\",\"${password}\"]`;
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa('admin:h@n@')}`
              });
              
              this.http.get(url, { headers }).subscribe(
                  async (response) => {
                    console.log(response)
                      if(response['rows'].length != 0 ){
                        if(this.user = response['rows'][0].value){ //true
                            const token = await Gatekeeper.loginByAuth(environment.authEmail, environment.authPassword);
                            
                            localStorage.setItem('token', token);
                            localStorage.setItem('userID', response['rows'][0].id);
                            await this.getProfile();
                            await this.GetUserPermissions();
                            this.router.navigate(['/']);
                        } else {
                            this.toastr.error("Inactive User"); 
                        }
                } else this.toastr.error("Incorrect Email/User");

            }, (error) => {console.error('Error:', error);});
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByAuth({email, password}) {
        try {
            const token = await Gatekeeper.registerByAuth(email, password);
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByGoogle() {
        try {
            const token = await Gatekeeper.loginByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByGoogle() {
        try {
            const token = await Gatekeeper.registerByGoogle();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async loginByFacebook() {
        try {
            const token = await Gatekeeper.loginByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async registerByFacebook() {
        try {
            const token = await Gatekeeper.registerByFacebook();
            localStorage.setItem('token', token);
            await this.getProfile();
            this.router.navigate(['/']);
        } catch (error) {
            this.toastr.error(error.message);
        }
    }

    async getProfile() {
        try {
            this.user = await Gatekeeper.getProfile();
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('settings');
        localStorage.removeItem('gatekeeper_token');
        this.user = null;
        this.router.navigate(['/login']);
    }


    async GetUserPermissions(){
        let userId = localStorage.getItem('userID');
        const url = `http://localhost:5984/users/_all_docs?include_docs=true&key=\"${userId}\"`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa('admin:h@n@')}`
          });
    
          try {
            this.http.get(url, { headers }).subscribe(
                async (response) => {
                    if(response['rows'].length != 0){
                        localStorage.setItem('settings', response['rows'][0]['doc'].setting_id)
                    } else {
                        this.toastr.warning("Unable to retrieve User. Login Required.")
                        this.logout();
                    }
                });
        } catch (error) {
            this.logout();
            throw error;
        }
    }
}
