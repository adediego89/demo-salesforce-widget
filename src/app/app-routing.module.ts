import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';
import { CasesComponent } from './_components/cases/cases.component';
import { OpportunitiesComponent } from './_components/opportunities/opportunities.component';
import { CaseDetailsComponent } from './_components/case-details/case-details.component';
import { OpportunityDetailsComponent } from './_components/opportunity-details/opportunity-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cases', component: CasesComponent, canActivate: [AuthGuard] },
  { path: 'cases/:id', component: CaseDetailsComponent, canActivate: [AuthGuard] },
  { path: 'opportunities', component: OpportunitiesComponent, canActivate: [AuthGuard] },
  { path: 'opportunities/:id', component: OpportunityDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
