import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnownProfileRoutingModule } from './known-profile-routing.module';
import { KnownProfileComponent } from './known-profile.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    KnownProfileComponent
  ],
  imports: [
    CommonModule,
    KnownProfileRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class KnownProfileModule { }
