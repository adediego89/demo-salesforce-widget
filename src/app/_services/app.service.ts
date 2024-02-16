import { Injectable } from '@angular/core';
import { CID_KEY, CONTACT_ACTION_KEY, GenesysCloudService, RELATIONS_ACTION_KEY } from './genesys-cloud.service';
import { SfContact } from '../_models/salesforce/sf-contact.interface';
import { BehaviorSubject, Observable, from, map, switchMap } from 'rxjs';
import { SfContactRelations } from '../_models/salesforce/sf-contact-relations.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private observable1$ = from(this.gcSvc.getAnalyticsConversationDetails(this.gcSvc.qParams[CID_KEY]));
  private observable2$ = (customerPhone: string | undefined) => from(this.gcSvc.executeDataAction(this.gcSvc.qParams[CONTACT_ACTION_KEY], { 'PHONE_NUMBER': customerPhone }))
  private observable3$ = (contactId: string | undefined) => from(this.gcSvc.executeDataAction(this.gcSvc.qParams[RELATIONS_ACTION_KEY], { 'ContactId': contactId }));

  getContact$: Observable<SfContact> = this.observable1$.pipe(
    map(conversationDetails => {
      const foundCustomerParticipant = conversationDetails.participants?.find(e => e.purpose === 'external' || e.purpose === 'customer');
      if (!foundCustomerParticipant) return;
      let customerPhone = conversationDetails.originatingDirection?.toLowerCase() === 'inbound'
      ? foundCustomerParticipant.sessions![0].ani
      : foundCustomerParticipant.sessions![0].dnis;
      // Remove tel: protocol
      customerPhone = customerPhone?.replace('tel:', '');
      return customerPhone;
    }),
    switchMap((customerPhone) => this.observable2$(customerPhone)),
    switchMap((contactsSearchResult) => {
      const sfCcontact = (contactsSearchResult as SfContact[])[0];
      return this.observable3$(sfCcontact.Id).pipe(
        map((contactRelationsData) => {
        // Combine results into a custom object
        const relations = contactRelationsData as SfContactRelations;
        sfCcontact.Cases = relations.Cases;
        sfCcontact.Opportunities = relations.Opportunities;
        return sfCcontact
      }));
    }),
  );

  contact = new BehaviorSubject<SfContact | null>(null);

  constructor(private readonly gcSvc: GenesysCloudService) {}

  updateContact(contact: SfContact) {
    this.contact.next(contact);
  }



}
