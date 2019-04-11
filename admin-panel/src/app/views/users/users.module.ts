import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    FormsModule,
    UsersRoutingModule
  ],
  declarations: [ UsersComponent ]
})

export class UsersModule { }
