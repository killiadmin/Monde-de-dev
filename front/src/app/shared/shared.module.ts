import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from './auth-header/auth-header.component';

@NgModule({
  declarations: [
    AuthHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NgOptimizedImage
  ],
  exports: [
    AuthHeaderComponent
  ]
})
export class SharedModule {}
