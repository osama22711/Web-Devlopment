import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public totalCountries;
  private DData;
  public totalNewConfirmed = 0;
  public totalConfirmed = 0;
  public totalDeaths = 0;
  public totalNewDeaths = 0;
  public totalNewRecovered = 0;
  public totalRecovered = 0;
  constructor() {
    this.getSummaryData().then(() => {
      this.getStatus();
    });
  }

  getSummaryData(): Promise<boolean> {
    return fetch(`${environment.CORONA_API_URL}summary`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        this.DData = data;
        return this.DData !== null;
      });
  }

  getStatus() {
    this.totalCountries = this.DData.Countries.length;
    this.DData.Countries.forEach((country) => {
      this.totalNewConfirmed += country.NewConfirmed;
      this.totalConfirmed += country.TotalConfirmed;
      this.totalNewDeaths += country.NewDeaths;
      this.totalDeaths += country.TotalDeaths;
      this.totalNewRecovered += country.NewRecovered;
      this.totalRecovered += country.TotalRecovered;
    });
  }
}
