import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SfOpportunity } from 'src/app/_models/salesforce/sf-contact-relations.interface';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent {

  private subs = new Subscription();
  itemList: SfOpportunity[] = [];

  constructor(private readonly appSvc: AppService) {
    this.subs.add(this.appSvc.contact.subscribe(contact => {
      if (!contact) return; // TODO: maybe navigate back to main since it should not be possible to access here without a contact
      if (!contact.Opportunities) {
        this.itemList = [];
      } else {
        this.itemList = contact.Opportunities;
      }
    }));
  }

}
