import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  imports: [
    FormsModule,
    OrdersRoutingModule
  ],
  declarations: [ OrdersComponent ]
})

export class OrdersModule { }
