import { Component, NgZone } from '@angular/core';

import { SwPush, SwUpdate } from '@angular/service-worker';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  public status = 'online';

  public isPushEnabled = false;

  constructor(
    private zone: NgZone,
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private matSnackBar: MatSnackBar
  ) {


    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    this.updateOnlineStatus();

    setTimeout(() => {
      this.showSnackbar('test');
    }, 3000);

  }

  private showSnackbar(text: string) {
    this.matSnackBar.open(text, null, { duration: 3000 });
  }

  private async listenForPush() {
    this.isPushEnabled = this.swPush.isEnabled;

    if (this.isPushEnabled) {
      // const sub = await this.swPush.requestSubscription({ serverPublicKey: 'test' })
      this.swPush.messages.subscribe((msg) => {
        console.log(msg);
      });
    }
  }

  updateOnlineStatus() {
    this.status = navigator.onLine ? 'online' : 'offline';
  }
}
