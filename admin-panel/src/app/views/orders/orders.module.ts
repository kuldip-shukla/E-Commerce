import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    OrdersRoutingModule,
    CommonModule
  ],
  declarations: [ OrdersComponent ]
})

export class OrdersModule { }
