import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SfCase } from 'src/app/_models/salesforce/sf-contact-relations.interface';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit, OnDestroy{

  private subs = new Subscription();
  itemList: SfCase[] = [];

  constructor(private readonly appSvc: AppService) {}

  ngOnInit(): void {
    this.subs.add(this.appSvc.contact.subscribe(contact => {
      if (!contact) return; // TODO: maybe navigate back to main since it should not be possible to access here without a contact
      if (!contact.Cases) {
        this.itemList = [];
      } else {
        this.itemList = contact.Cases;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
