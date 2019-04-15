import { NgModule } from '@angular/core';
import { UpdateProductComponent } from './update-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UpdateProductComponent,
    data: {
      title: 'UpdateProduct'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UpdateProductRoutingModule { }
