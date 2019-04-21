import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationEnd
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StatTrack';
  loadingApp = true;

  constructor(private router: Router,
              private spinner: NgxSpinnerService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.spinner.show();
  }

  // Hides the loading spinner after application loads.
  private _navigationInterceptor(event: RouterEvent): void {
    if (this.loadingApp && event instanceof NavigationEnd) {
      this._hideSpinner();
      this.loadingApp = false;
    }
  }

  private _hideSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
