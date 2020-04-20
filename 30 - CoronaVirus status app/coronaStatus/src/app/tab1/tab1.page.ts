import { summaryData } from './../../models/summaryData.model';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { countryCodes } from 'src/models/countryCodes';
import {
  AdMobFree,
  AdMobFreeInterstitialConfig,
} from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private Data;
  public summaryData = {
    Countries: null,
    Date: null,
  };
  private endValue = 0;
  private codes;
  public searchFor: string;
  private DData;
  constructor(private adMob: AdMobFree) {
    this.codes = _.invert(countryCodes);
    this.getSummaryData().then(() => {
      this.summaryData.Countries = this.Data[this.endValue];
    });
  }

  ngOnInit() {}

  ionViewDidLoad() {
    this.launchInterstitial();
  }

  launchInterstitial() {
    const config: AdMobFreeInterstitialConfig = {
      isTesting: true, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-5799650019891884/3239576439',
    };
    // this.adMob.interstitial.config(config);
    // this.adMob.interstitial.prepare();
    this.adMob.banner.config(config);
    this.adMob.banner.prepare();
  }

  onSearch(event) {
    this.searchFor = event.target.value;
    if (this.searchFor === '') {
      this.endValue = 0;
      this.summaryData.Countries = this.Data[this.endValue];
    } else {
      this.DData.Countries.filter((element) => {
        if (element.Country === this.searchFor) {
          this.summaryData.Countries = [];
          this.summaryData.Countries.push(element);
        }
      });
    }
  }

  loadData(event) {
    ++this.endValue;
    const array = this.Data[this.endValue];
    if (array) {
      for (let i = 0; i < array.length; i++) {
        this.summaryData.Countries.push(array[i]);
      }
      event.target.complete();
    } else {
      event.target.disabled = true;
    }
  }

  getSummaryData(): Promise<boolean> {
    return fetch(`${environment.CORONA_API_URL}summary`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.Countries.length; i++) {
          const country = this.codes[`${data.Countries[i].Country}`];
          data.Countries[i] = {
            countryFlag: `https://www.countryflags.io/${country}/shiny/64.png`,
            ...data.Countries[i],
          };
        }
        this.DData = data;
        this.Data = _.chunk(data.Countries, 15);
        this.summaryData.Date = data.Date;
        return this.Data !== null;
      });
  }
}
