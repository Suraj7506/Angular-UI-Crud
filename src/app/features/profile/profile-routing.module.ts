import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnownProfileComponent } from './known-profile/known-profile.component';

const routes: Routes = [
  { path: '', component: KnownProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
