import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

declare var PhoneCallTrap: any;
//phone calls
declare var window: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  constructor(
    private androidPermissions: AndroidPermissions,
    private callNumber: CallNumber,
  ) {
    // this.alarms();
    this.checkPermissionCall();
    console.log(window.PhoneCallTrap);
  }

  // To call a number programmitaclly ( it requests by itself )
  // <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>
  // this.callNumber
  //     .callNumber('18001010101', true)
  //     .then((res) => console.log('Launched dialer!', res))
  //     .catch((err) => console.log('Error launching dialer', err));
  // <<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>

  ngOnInit() {}

  onAdd() {}

  onEdit() {}

  checkPermissionCall() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
      .then(
        (success) => {
          //if permission granted
          this.phonecalls();
        },
        (err) => {
          this.androidPermissions
            .requestPermission(
              this.androidPermissions.PERMISSION.READ_PHONE_STATE,
            )
            .then(
              (success) => {
                this.phonecalls();
              },
              (err) => {
                console.log('cancelled');
              },
            );
        },
      );
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.READ_PHONE_STATE,
    ]);
  }

  //phone calls
  phonecalls() {
    if (window.PhoneCallTrap) {
      window.PhoneCallTrap.onCall(function (state) {
        alert('CHANGE STATE: ' + state);
        //var callObj = JSON.parse(state),
        ///state = callObj.state,
        this.callingNumber = state.incomingNumber;
        alert('callingNumber STATE: ' + this.callingNumber);

        switch (state) {
          case 'RINGING':
            console.log('Phone is ringing');
            break;
          case 'OFFHOOK':
            console.log('Phone is off-hook');
            break;

          case 'IDLE':
            console.log('Phone is idle');
            break;
        }
      });
    }
  }

  alarms() {
    window.wakeuptimer.wakeup(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      },
    );
  }
}
