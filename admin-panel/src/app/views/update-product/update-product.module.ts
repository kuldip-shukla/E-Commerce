import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProductRoutingModule } from './update-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product.component';

@NgModule({
  imports: [
    CommonModule,
    UpdateProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ UpdateProductComponent ]
})
export class UpdateProductModule { }
