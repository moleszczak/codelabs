import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button type="button" class="primary" (click)="filterList(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let hl of filteredHousingLocationList" [housingLocation]="hl"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, HousingLocationComponent],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocationsFromWeb().then((housingLocations) => {
      this.housingLocationList = housingLocations;
      this.filteredHousingLocationList = housingLocations;
    });
  }

  filterList(filterValue: string): void {
    if (!filterValue) {
      this.filteredHousingLocationList = this.housingLocationList;
      return;
    } else {
      const f = filterValue.toLowerCase();
      this.filteredHousingLocationList = this.housingLocationList.filter((item) => item.city.toLowerCase().includes(f));
    }
  }

  private housingService: HousingService = inject(HousingService);
}
