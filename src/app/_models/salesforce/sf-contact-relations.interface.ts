export interface SfContactRelations {
  Cases: SfCase[];
  Opportunities: SfOpportunity[];
}

export interface SfCase {
  Id: string;
  Description: string;
  CaseNumber: string;
  CreatedDate: string;
  LastModifiedDate: string;
  Type: string;
  Status: string;
  Reason: string;
  Origin: string;
  Subject: string;
  Priority: string;
  OwnerId: string;
  Product__c: string;
}

export interface SfOpportunity {
  Id: string;
  Name: string;
  Description: string;
  CreatedDate: string;
  LastModifiedDate: string;
  StageName: string;
  Ammount?: number;
  Probability: number;
  ExpectedRevenue?: number;
  Type: string;
  LeadSource: string;
  OwnerId: string;
  CloseDate: string;
}
