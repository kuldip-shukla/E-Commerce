import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product.component';

const routes: Routes = [
  {
    path: '',
    component: AddProductComponent,
    data: {
      title: 'AddProduct'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AddProductRoutingModule { }
