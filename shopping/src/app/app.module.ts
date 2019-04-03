import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { DetailComponent } from './detail/detail.component';
import { PaymentComponent } from './payment/payment.component';
import { UserService } from './user.service';
import { AddItemComponent } from './add-item/add-item.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './auth.guard';
import { SuccessComponent } from './success/success.component';
import { Category1Component } from './category1/category1.component';
import { Category2Component } from './category2/category2.component';
import { CartComponent } from './cart/cart.component';
import { FailedComponent } from './failed/failed.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    DetailComponent,
    PaymentComponent,
    AddItemComponent,
    HeaderComponent,
    FooterComponent,
    SuccessComponent,
    Category1Component,
    Category2Component,
    CartComponent,
    FailedComponent,
    PagenotfoundComponent,
    UpdateprofileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RecaptchaModule,
    AppRoutingModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
