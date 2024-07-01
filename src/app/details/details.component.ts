import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Exterior photot of {{ housingLocation?.name }}" />
      <section class="listing-descrription">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing=location">{{ housingLocation?.city }} - {{ housingLocation?.state }}</p>
      </section>
      <section class="listening-features">
        <h2>About this housing location</h2>
        <ul>
          <li>Units available {{ housingLocation?.availableUnits }}</li>
          <li>Does this location has wi-fi {{ housingLocation?.wifi }}</li>
          <li>Does this location has laundry {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listening-features">
        <h2>Apply for this location</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">EMail</label>
          <input id="email" type="text" formControlName="email" />
          <button type="submit" class="primary">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation!: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    this.housingService.getHousingLocationByIdFromWeb(Number(this.route.snapshot.params['id'])).then((hl) => {
      this.housingLocation = hl;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(this.applyForm.value.firstName ?? '', this.applyForm.value.lastName ?? '', this.applyForm.value.email ?? '');
  }
}
