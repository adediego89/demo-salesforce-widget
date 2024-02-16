import { SfCase, SfOpportunity } from "./sf-contact-relations.interface";

export interface SfContact {
  Birthdate: string;
  CreatedDate: string;
  Email: string;
  FirstName: string;
  Id: string;
  IsDeleted: boolean;
  LastName: string;
  Name: string;
  OwnerId: string;
  Phone: string;
  Salutation: string;
  Title: string;
  Cases?: SfCase[];
  Opportunities?: SfOpportunity[];
}
