import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { KnownProfileModule } from './known-profile/known-profile.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    FormsModule,
    KnownProfileModule
  ]
})
export class ProfileModule { }
