import { Component, NgZone } from '@angular/core';

import { } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public status = 'online';

  constructor(private zone: NgZone) {


    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    this.updateOnlineStatus();


  }

  updateOnlineStatus() {
      this.status = navigator.onLine ? 'online' : 'offline';
  }
}
