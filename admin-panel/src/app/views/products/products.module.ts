import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    ProductsRoutingModule,
    CommonModule
  ],
  declarations: [ ProductsComponent ]
})
export class ProductsModule { }
