import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SfContact } from 'src/app/_models/salesforce/sf-contact.interface';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  loading = false;
  contact?: SfContact;

  constructor(private readonly appSvc: AppService) {}

  ngOnInit(): void {

    if (this.appSvc.contact.value) {
      this.contact = this.appSvc.contact.value;
      return;
    }

    // Initialize loading status
    this.loading = true;
    // Get contact.
    this.subs.add(this.appSvc.getContact$.subscribe({
      next: (contact) => {
        this.contact = contact;
        if (contact) {
          this.appSvc.updateContact(contact);
        }
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => { this.loading = false; }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
