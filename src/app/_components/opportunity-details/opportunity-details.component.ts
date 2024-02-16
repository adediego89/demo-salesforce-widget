import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { SfOpportunity } from 'src/app/_models/salesforce/sf-contact-relations.interface';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit, OnDestroy{

  private subs = new Subscription();
  itemDetails?: SfOpportunity;

  constructor(private readonly route: ActivatedRoute, private readonly appSvc: AppService) {}

  ngOnInit(): void {
    this.subs.add(this.route.params.pipe(
      switchMap((params) => {

        return this.appSvc.contact.asObservable().pipe(
          map(contact => contact?.Opportunities?.find(e => e.Id === params['id'])));
      })
    ).subscribe(sfCase => {
      this.itemDetails = sfCase;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
