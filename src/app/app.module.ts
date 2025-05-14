import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './features/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { SubheaderComponent } from './shared/subheader/subheader.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SubheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthModule,
       ToastrModule.forRoot({
      timeOut: 3000,
      extendedTimeOut: 1000,
      easeTime: 300,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
      maxOpened: 1,
      autoDismiss: true,
      preventDuplicates: true,
      newestOnTop: true,
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
