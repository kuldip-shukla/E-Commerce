import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { PaymentComponent } from './payment/payment.component';
import { AddItemComponent } from './add-item/add-item.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { SuccessComponent } from './success/success.component';
import { Category1Component } from './category1/category1.component';
import { Category2Component } from './category2/category2.component';
import { CartComponent } from './cart/cart.component';
import { FailedComponent } from './failed/failed.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detail/:id', component: DetailComponent },
  // { path: 'payment/:id', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'addProduct', component: AddItemComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent },
  { path: 'laptops', component: Category1Component },
  { path: 'mobiles', component: Category2Component },
  { path: 'success', component: SuccessComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'cart/:id', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'failed', component: FailedComponent },
  { path: 'updateprofile', component: UpdateprofileComponent},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, 
                                  RegistrationComponent,
                                  HomeComponent,
                                  DetailComponent,
                                  PaymentComponent,
                                  AddItemComponent,
                                  HeaderComponent,
                                  Category1Component,
                                  Category2Component,
                                  CartComponent,
                                  SuccessComponent,
                                  PagenotfoundComponent,
                                  FailedComponent];