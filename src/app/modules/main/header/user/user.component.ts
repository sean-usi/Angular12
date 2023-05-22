import {Component, OnInit} from '@angular/core';
import {AppService} from '@services/app.service';
import { BakcEndService } from '@/bakc-end.service';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user;
    public display_user;
    constructor(private appService: AppService, private backEndService: BakcEndService) {}

    ngOnInit(): void {
        this.user = this.appService.user;
        this.display_user = this.backEndService.getSystemUser().subscribe(
            async (response) => {
                this.display_user = response['rows'][0].doc});

    }

    logout() {
        this.appService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
