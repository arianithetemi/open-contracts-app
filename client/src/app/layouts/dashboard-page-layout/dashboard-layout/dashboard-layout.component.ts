import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private userService: UserService,
    private router: Router, private translate: TranslateService, private titleService: Title
  ) {
    this.translate.get('pageTitle.title')
      .takeUntil(this.unsubscribeAll)
      .subscribe(name => {
        this.titleService.setTitle(name);
      });
  }

  ngOnInit() {
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    return false;
  }

}
