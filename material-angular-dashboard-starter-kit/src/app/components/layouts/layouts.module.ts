import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlankLayoutCardComponent } from 'app/components/ui/blank-layout-card';
import { MessageMenuComponent } from 'app/components/ui/message-menu';
import { NotificationMenuComponent } from 'app/components/ui/notification-menu';
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
    MessageMenuComponent,
    NotificationMenuComponent,
  ],
  exports: [
    CommonLayoutComponent,
    BlankLayoutComponent,
  ],
})
export class LayoutsModule { }
