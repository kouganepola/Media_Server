import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlankLayoutCardComponent } from 'app/components/ui/blank-layout-card';

import { SidebarComponent } from 'app/components/ui/sidebar';
import { ThemeModule } from 'theme';
import { BlankLayoutComponent } from './blank-layout';
import { CommonLayoutComponent } from './common-layout';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    CommonLayoutComponent,
    BlankLayoutComponent,
    BlankLayoutCardComponent,
    SidebarComponent,
  
  ],
  exports: [
    CommonLayoutComponent,
    BlankLayoutComponent,
  ],
})
export class LayoutsModule { }
