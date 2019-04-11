import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ProductsRoutingModule
  ],
  declarations: [ ProductsComponent ]
})
export class ProductsModule { }
