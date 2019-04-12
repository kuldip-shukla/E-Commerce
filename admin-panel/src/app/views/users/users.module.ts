import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    UsersRoutingModule,
    CommonModule
  ],
  declarations: [ UsersComponent ]
})

export class UsersModule { }
