import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scheduled = [];

  constructor(private plt: Platform, private localNotification: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotification.on('click').subscribe(res => {
        console.log('click: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
      this.localNotification.on('trigger').subscribe(res => {
        console.log('trigger: ', res);
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }

  scheduleNotification() {
    this.localNotification.schedule({
      id: 1,
      title: 'Attention',
      text: 'OzmaS Notification',
      data: { mydata: 'My hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND},
      // foreground: true,
    });
  }

  recurringNotification() {
    this.localNotification.schedule({
      id: 2,
      title: 'Recurring',
      text: 'OzmaS Recurring Notification',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE },
      // foreground: true,
    });
  }

  repeatingDaily() {
    this.localNotification.schedule({
      id: 42,
      title: 'Good Morning',
      text: 'Code something epic today!',
      data: { mydata: 'My hidden message this is' },
      trigger: { every: { hour: 11, minute: 50} },
      // foreground: true,
    });
  }

  getAll() {
    this.localNotification.getAll().then(res => {
      this.scheduled = res;
    });
  }

  showAlert(header, sub , msg) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }

}
